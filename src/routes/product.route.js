import express from 'express';
import {acess,protectRoute} from '../config/auth.js'
import {validData , Product_exisit} from '../util/validator/product.validator.js'
import { create ,getAll,getOne,drop,update} from '../controller/product.controller.js';
import {uploadMeny} from '../util/multer.util.js'
import {IsValidId} from '../util/validator/product.validator.js';
import {filterImages} from '../middleware/EditImage_sharp.js'
const router = express.Router();



// @desc       Create new Product
// @route      POST /api/v1/product
// @access     Private
router.route('/').post(protectRoute , acess , uploadMeny , filterImages ,validData, create);


// @desc       Update Product
// @route      PUT /api/v1/product:id
// @access     Private
router.route('/:id').put(protectRoute , acess ,IsValidId,Product_exisit, update);


// @desc       Delete Product
// @route      Delete /api/v1/product:id
// @access     Private
router.route('/:id').delete(protectRoute , acess ,IsValidId  , uploadMeny,Product_exisit ,drop);


// @desc       Get one Product
// @route      GET /api/v1/product:id
// @access     Public
router.route('/:id').get(IsValidId , getOne);


// @desc       Get All Product
// @route      GET /api/v1/product
// @access     Public
router.route('/').get(getAll);




export default router;
