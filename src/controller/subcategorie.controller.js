import asyncHandler from "../middleware/async.js"
import SubcategorieShema from '../schema/Subcategorie.schema.js'
import ApiError from "../util/ApiError.js"
import fs from 'fs';

const create = asyncHandler(async (req, res) => {
  
    const generate = await new SubcategorieShema(req.body);
    await generate.save();
    res.status(201).json({
        Sucess: 'SubCategorie Created successfully'
    });
})


const update = asyncHandler(async (req, res) => {
    let { id } = req.params;

    if (!req.body.description) { delete req.body.description; } 
     if (!req.body.name) { delete req.body.name; } 
     if (!req.body.id) { delete req.body.id; }

     const data = await SubcategorieShema.findOneAndUpdate({ _id: id }, {
        $set: { 
            description: req.body.description,
            name : req.body.name,
            categorie : req.body.id
        }
    });
    res.status(200).json({
        info : `Categorie ID: ${id} Updated`
    })
    console.log(req.body)
})


const drop = asyncHandler(async (req, res) => {

    
    let { id } = req.params;
    const data = await SubcategorieShema.findOne({_id : id});
    fs.unlinkSync(`./images/subcategorie/${data.img}`); // <=== Here error 
    const value = await SubcategorieShema.findOneAndDelete({ _id: id });
    
    if (value === null) {
         return next(new ApiError(`Categorie ID:${id} Notfound`, 404))
      
    } else {
        res.status(200).json({data: `SubCategorie ID:${id} Deleted Scucessfuly` })
    }
})


const getOne = asyncHandler(async (req, res) => {
    let { id } = req.params;
    const data = await SubcategorieShema.findOne({ _id: id });
    if (data === null) return next(new ApiError(`Categorie ID :${id} not exisit`, 404));
    res.status(200).json(data)
})

const getAll = asyncHandler(async (req, res) => {
    let page = req.query.page * 1 || 1;
    let limit = req.query.limit * 1 || 5;
    let skip = (page - 1) * limit;
    const data = await SubcategorieShema.find({}).skip(skip).limit(limit);
    res.status(200).json({
        reslut: data.length,
        page,
        data
    })
})

export {
    create, update, drop, getOne, getAll
}