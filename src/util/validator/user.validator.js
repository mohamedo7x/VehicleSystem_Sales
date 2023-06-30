import { body, param, check } from 'express-validator';
import UserShema from '../../schema/User.schema.js'
import Vlaidation from '../../middleware/validator.middleware.js'
import ApiError from '../ApiError.js';

//@desc Validation check before register and find if element exisit
//@element [username , password  , email]

const UserValidation = [
    body('username').notEmpty().withMessage('UserName filed requierd').isLength({
        min: 3,
    }).withMessage('Invalid username to small')
        .isLength({ max: 10 }).withMessage('Invalid username to long')
        .toLowerCase()
        .trim()
        .custom(async value => {
            const parms = /[!@#$%^&*(),?":{}|<>]/;
            if (parms.test(value)) {
                return Promise.reject(new ApiError('invalid username', 401))
            }
            if (await UserShema.findOne({ username: value })) {
                return Promise.reject(new ApiError('Username already exists ', 401))
            }
            return true;
        }),
    body('password').notEmpty().withMessage('Password filed requierd').isLength({ min: 4, max: 20 }).withMessage('invalid passowrd').custom(value => {
        if (value.trim().length === 0) {
            return Promise.reject(new ApiError('Invalid Password', 401));
        }
        return true;

    }),
    body('email').notEmpty().withMessage('Email filed requierd').isEmail().trim().withMessage('email not valid').custom(async value => {
        if (await UserShema.findOne({ email: value })) {
            return Promise.reject(new ApiError('Email already exists'), 401)
        }
        return true;
    })
    ,   
    Vlaidation
]

//@desc Validation check before Login
//@element [username , password ]
const LoginValidation = [
    body('password').notEmpty().withMessage('Password filed requierd').isLength({ min: 4, max: 20 }).withMessage('invalid passowrd').custom(value => {
        if (value.trim().length === 0) {
            return Promise.reject(new ApiError('Invalid Password', 401));
        }
        return true;

    }),
    body('username').notEmpty().withMessage('UserName filed requierd').isLength({
        min: 3,
    }).withMessage('Invalid username to small')
        .isLength({ max: 10 }).withMessage('Invalid username to long')
        .toLowerCase()
        .trim()
    , Vlaidation
]

export { UserValidation , LoginValidation };