import {param, check, body, checkExact } from 'express-validator';
import SubcategorieSchema from '../../schema/Subcategorie.schema.js';
import Vlaidation from '../../middleware/validator.middleware.js'
import CategorieSchema from '../../schema/Categorie.Schema.js';
import ProdctSchema from '../../schema/Product.schema.js'
import ApiError from '../ApiError.js';


const validData = [
    check('name').notEmpty().withMessage('Filed Name was empty').trim()
    .isLength({min : 2}).withMessage('filed Name is to small')
    .isLength({max : 20}).withMessage('Filed Name is to long').custom(async val => {
        const Product = await ProdctSchema.findOne({name : val})
        if(Product){
            return Promise.reject(new ApiError('Product Already exisit' , 401))
        }
        return true;
    }),
    check('description').trim().notEmpty().withMessage('Filed description was empty')
    .isLength({min:5}).withMessage('Filed description is to small')
    .isLength({max : 200}).withMessage('Filed description is to long'),
    body('categorie').notEmpty().withMessage('Filed Categorie requierd').isMongoId().withMessage('In valid iD Categorie').custom(async (val , {req}) => {
        const data = await CategorieSchema.findOne({_id : val});
        if(data === null)
        {
            return Promise.reject(new ApiError(`Categorie ID : ${val} NotFound ` , 400))
        }
        return true
    }),
    body('subcategorie').notEmpty().withMessage('Filed Categorie requierd').isMongoId().withMessage('In valid iD Categorie').custom(async (val , {req}) => {
        const data = await SubcategorieSchema.findOne({_id : val}); 
        if(data === null)
        {
            return Promise.reject(new ApiError(`SubCategorie ID : ${val} NotFound ` , 400))
        }
        return true
    }),
    body('images').notEmpty().withMessage('Field img is Requierd').isArray().withMessage('Images Not supported').custom(val => {
        if(val.length === 0){
            
            return Promise.reject(new ApiError('Filed Image requierd') ,401);
        }
        return true;
    }),
    body('model').notEmpty().withMessage('Filed model is Empty').isLength({min:3 , max:20}).withMessage('invalid mode name'),
    body('year').notEmpty().withMessage('Filed year is empty').custom (val => {
       if(val < 0)
       {
        return Promise.reject(new ApiError('Invalid Year',401))
       }
        if(val.length >4)
        {
            return Promise.reject(new ApiError('Invalid Year',401))
        }
        if(typeof Number(val) !== typeof 1){
            return Promise.reject(new ApiError('Invalid Year requier {Number}', 401))
        }
        return true;
    }),
    body('kilometers').toFloat().notEmpty().withMessage('filed kilometers is empty'),
    body('price').toFloat().notEmpty().withMessage('filed price is empty')
    ,Vlaidation
]

const Product_exisit = [
    param('id').custom(async val => {
        const data = await ProdctSchema.findOne({_id : val});
        if(data === null)
        {
            return Promise.reject(new ApiError('Product Not Found' , 404))
        }
        return true;
    })
    ,Vlaidation
]

const IsValidId = [
    check('id').isMongoId().withMessage('Not Valid ID')
    ,Vlaidation
]

export {
    validData,
    Product_exisit,
    IsValidId
}