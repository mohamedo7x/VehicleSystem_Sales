import express from 'express';
import {create,update,drop,getOne,getAll} from '../controller/subcategorie.controller.js'
import {acess,protectRoute} from '../config/auth.js'
import {Create_SubCategorieValidator,IsValidId,updateSubCategorie,SubCategorieExisit , If_Id_exisit }from '../util/validator/subcategorie.validator.js'
import {uploadOne} from '../util/multer.util.js' // <===
import {editOne} from '../middleware/EditImage_sharp.js'
const router = express.Router();

// @desc       Create new SubCategorie
// @route      POST /api/v1/subcategorie
// @access     Private
router.route('/').post(protectRoute , acess ,uploadOne , editOne ,  Create_SubCategorieValidator  ,create);


// @desc       Update subcategorie
// @route      PUT /api/v1/subcategorie:id
// @access     Private
router.route('/:id').put(protectRoute , acess ,IsValidId  ,uploadOne,editOne  , updateSubCategorie ,If_Id_exisit,update);


// @desc       Delete subCategorie
// @route      Delete /api/v1/subcategorie:id
// @access     Private
router.route('/:id').delete(protectRoute , acess  , IsValidId, SubCategorieExisit,drop);


// @desc       Get One Subcategorie
// @route      GET /api/v1/subcategorie:id
// @access     Public
router.route('/:id').get(IsValidId,getOne);


// @desc       Get All subcategorie
// @route      GET /api/v1/subcategorie
// @access     Public
router.route('/').get(getAll);

export default router;