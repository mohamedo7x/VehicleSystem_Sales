import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
import asyncHandler from "../middleware/async.js"
import ProductSchema from "../schema/Product.schema.js";
import ApiError from "../util/ApiError.js";
const create =asyncHandler(async (req , res ) => {
    let generate = await new ProductSchema(req.body);
    await generate.save();
    res.status(201).json({
        Sucess: 'Product Created successfully'
    });
})



const update =asyncHandler(async (req , res ) => {
 // Not finished :(
})



const drop =asyncHandler(async (req , res ) => {

    let { id } = req.params;
    const data = await ProductSchema.findOne({_id : id});
    let files = data.images;
    files.forEach(element => {
        const filePath = path.join(__dirname , '..', 'images' , 'Product' ,`${element}`)
         fs.unlinkSync(filePath);
    });

    const value = await ProductSchema.findOneAndDelete({ _id: id });
    
    if (value === null) {
         return next(new ApiError(`Categorie ID:${id} Notfound`, 404))
      
    } else {
        res.status(200).json({data: `SubCategorie ID:${id} Deleted Scucessfuly` })
    }
})



const getOne =asyncHandler(async (req , res , next ) => {
    let { id } = req.params;
    const data = await ProductSchema.findOne({ _id: id }).populate({
        path:'categorie subcategorie',
        select : '-_id name'});
    if (data === null) {
        return next(new ApiError(`Categorie ID :${id} not exisit`, 400));
    }
   
    res.status(200).json(data)
})


const getAll =asyncHandler(async (req , res ) => {
    let page = req.query.page * 1 || 1;
    let limit = req.query.limit * 1 || 5;
    let skip = (page - 1) * limit;
    const data = await ProductSchema.find({}).populate({
        path:'categorie subcategorie',
        select : '-_id name'}).skip(skip).limit(limit);
    res.status(200).json({
        reslut: data.length,
        page,
        data
    })
})

export {
    create ,
    getAll,
    getOne,
    drop,
    update
}