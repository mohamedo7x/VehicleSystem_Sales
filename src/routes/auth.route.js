import express from 'express';
import {UserValidation , LoginValidation} from '../util/validator/user.validator.js'
import { register , login } from '../controller/auth.controller.js';
const router  = express.Router();


// @desc       Create new Account
// @route      POST /api/v1/register
// @access     Public
router.route('/register').post(UserValidation , register);


// @desc       Create new Account
// @route      POST /api/v1/register
// @access     Public
router.route('/login').post(LoginValidation , login);

export default router;