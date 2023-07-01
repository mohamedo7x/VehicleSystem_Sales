import {param, check, body, checkExact } from 'express-validator';
import CategorieSchema from '../../schema/Categorie.Schema.js';
import Vlaidation from '../../middleware/validator.middleware.js'
import ApiError from '../ApiError.js';


const Create_CategorieValidator = [
    check('name').notEmpty().withMessage('Filed Name was empty').trim()
    .isLength({min : 2}).withMessage('filed Name is to small')
    .isLength({max : 20}).withMessage('Filed Name is to long').custom(async val => {
        const categorie = await CategorieSchema.findOne({name : val})
        if(categorie){
            return Promise.reject(new ApiError('Categorie Already exisit'))
        }
        return true;
    }),
    check('description').trim().notEmpty().withMessage('Filed description was empty')
    .isLength({min:5}).withMessage('Filed description is to small')
    .isLength({max : 100}).withMessage('Filed description is to long')
    ,Vlaidation
]
const IsValidId = [
    param('id').isMongoId().withMessage('Not Valid ID')
    ,Vlaidation
]
const CategorieExisit = [
    param('id').custom(async val =>  {
        const categorie = await CategorieSchema.findOne({_id , val});
        if(categorie === null) {
            return Promise.reject(new ApiError(`categorie ID:${val} NotFound` , 404))
        }
        return true;
    })
    ,Vlaidation
]
const updateCategorie = [
    body('name').isLength({max :20}).withMessage('Field Name is To long'),
    body('description').trim().isLength({max :100}).withMessage('Field Name is To long').custom((val, {req}) => {
      if(!req.body.name && !val)
        {
            return Promise.reject(new ApiError('Filed Name & Description is Empty',401))
        }
       return true;
    })
    ,Vlaidation
]
export {
    Create_CategorieValidator,
    IsValidId,
    updateCategorie,
    CategorieExisit
}