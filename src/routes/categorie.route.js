import express from 'express';
import {updateCategorie,IsValidId , Create_CategorieValidator} from '../util/validator/categorie.validator.js'
import {create,update,drop,getOne, getAll} from '../controller/categorie.controller.js'
import {acess,protectRoute} from '../config/auth.js'
const router = express.Router();


// @desc       Create new Categorie
// @route      POST /api/v1/categorie
// @access     Private
router.route('/').post(protectRoute,acess,Create_CategorieValidator,create);


// @desc       Update Categorie
// @route      PUT /api/v1/categorie/:ID
// @access     Private
router.route('/:id').put(protectRoute,acess,IsValidId , updateCategorie ,update);


// @desc       Delete Categorie
// @route      DELETE /api/v1/categorie/:ID
// @access     Private
router.route('/:id').delete(protectRoute,acess , IsValidId ,drop);


// @desc       Display Spesific Categorie
// @route      GET /api/v1/categorie/:ID
// @access     Public
router.route('/:id').get(IsValidId ,getOne);


// @desc       Create new Account
// @route      POST /api/v1/register
// @access     Public
router.route('/').get(getAll);

export default router;