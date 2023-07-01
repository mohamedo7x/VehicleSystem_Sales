import CategorieSchema from "../schema/Categorie.Schema.js"
import asyncHandler from "../middleware/async.js"
import ApiError from "../util/ApiError.js";

const create = asyncHandler(async (req, res) => {
    const generate = await new CategorieSchema(req.body);
    await generate.save();
    res.status(201).json({
        Sucess: 'Categorie Created successfully'
    });
})


const update = async (req, res) => {
    let { id } = req.params;
    if (!req.body.name) {
        const data = await CategorieSchema.findOneAndUpdate({ _id: id }, {
            $set: { 
                description: req.body.description
            }
        });
        res.status(200).json({
            info : `Categorie ID: ${id} Description Updated`
        })
    } else if (!req.body.description) {
        const data = await CategorieSchema.findOneAndUpdate({ _id: id }, {
            $set: {
                name: req.body.name
            }
        });
        res.status(200).json({
            info : `Categorie ID: ${id} Name Updated`
        })
    }else {
        const data = await CategorieSchema.findOneAndUpdate({ _id: id }, {
            $set: {
                name: req.body.name,
                description: req.body.description
            }
        });
        res.status(200).json({
            info : `Categorie ID: ${id} Name & Description Updated`
        })
    }
   
}



const drop = async (req, res, next) => {
    let { id } = req.params;
    const data = await CategorieSchema.findOneAndDelete({ _id: id });
    if (data) {
        res.status(200).json({
            data: `Categorie ID:${id} Deleted Scucessfuly`
        })
    } else {
        return next(new ApiError(`Categorie ID:${id} Notfound`, 404))
    }
}



const getOne = async (req, res, next) => {
    let { id } = req.params;
    const data = await CategorieSchema.findOne({ _id: id });
    if (data === null) return next(new ApiError(`Categorie ID :${id} not exisit`, 404));
    res.status(200).json(data)
}



const getAll = asyncHandler(async (req, res) => {
    let page = req.query.page * 1 || 1;
    let limit = req.query.limit * 1 || 5;
    let skip = (page - 1) * limit;
    const data = await CategorieSchema.find({}).skip(skip).limit(limit);
    res.status(200).json({
        reslut: data.length,
        page,
        data
    })
})


export {
    create,
    update,
    drop,
    getOne,
    getAll

}