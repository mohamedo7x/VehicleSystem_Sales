import express from 'express';
import { register , login } from '../controller/auth.controller.js';
const router  = express.Router();


// @desc       Create new Account
// @route      POST /api/v1/register
// @access     Public
router.route('/register').post(register);

export default router;