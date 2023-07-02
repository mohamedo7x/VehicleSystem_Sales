import {param, check, body, checkExact } from 'express-validator';
import SubcategorieSchema from '../../schema/Subcategorie.schema.js';
import Vlaidation from '../../middleware/validator.middleware.js'
import CategorieSchema from '../../schema/Categorie.Schema.js';
import ApiError from '../ApiError.js';


const Create_SubCategorieValidator = [
    check('name').notEmpty().withMessage('Filed Name was empty').trim()
    .isLength({min : 2}).withMessage('filed Name is to small')
    .isLength({max : 20}).withMessage('Filed Name is to long').custom(async val => {
        const Subcategorie = await SubcategorieSchema.findOne({name : val})
        if(Subcategorie){
            return Promise.reject(new ApiError('SubCategorie Already exisit'))
        }
        return true;
    }),
    check('description').trim().notEmpty().withMessage('Filed description was empty')
    .isLength({min:5}).withMessage('Filed description is to small')
    .isLength({max : 100}).withMessage('Filed description is to long'),
    body('categorie').notEmpty().withMessage('Filed Categorie requierd').isMongoId().withMessage('In valid iD Categorie').custom(async (val , {req}) => {
        const data = await CategorieSchema.findOne({_id : val});
        if(data === null)
        {
            return Promise.reject(new ApiError(`Categorie ID : ${val} NotFound ` , 400))
        }
        return true
    }),
    body('img').notEmpty().withMessage('Field img is Requierd')
    ,Vlaidation
]
const IsValidId = [
    check('id').isMongoId().withMessage('Not Valid ID')
    ,Vlaidation
]
const SubCategorieExisit = [
    param('id').custom(async val =>  {
        const Subcategorie = await SubcategorieSchema.findOne({_id : val});
        if(Subcategorie === null) {
            return Promise.reject(new ApiError(`Subcategorie ID:${val} NotFound` , 404))
        }
       
        return true;
    })
    ,Vlaidation
]
const updateSubCategorie = [

    body('name').isLength({max :20}).withMessage('Field Name is To long'),
    body('description').trim().isLength({max :100}).withMessage('Field Name is To long').custom((val, {req}) => {
      if(!req.body.name && !val && !req.body.id)
        {
            return Promise.reject(new ApiError('Filed Name & Description &Categorie ID is Empty',401))
        }
       return true;
    })
    ,Vlaidation
]

const If_Id_exisit = [
    body('id').custom(async val => {
        if(!val)
        {
            return true
        }
        else {
            function isMongoId(id) {
                const objectIdRegex = /^[0-9a-fA-F]{24}$/;
              
                return objectIdRegex.test(id);
              }
              
            if(!isMongoId(val)){
                return Promise.reject(new ApiError(`ID ${val} NOT VALID`,401))
            }
            const data = await CategorieSchema.findOne({_id : val});
            if(data === null)
            {
                return Promise.reject(new ApiError(`Categorie ID ${val} Not Found`, 404))
            }
            return true
        }
       
        
    })
   
    ,Vlaidation
]

export {
    Create_SubCategorieValidator,
    IsValidId,
    updateSubCategorie,
    SubCategorieExisit,
    If_Id_exisit
}