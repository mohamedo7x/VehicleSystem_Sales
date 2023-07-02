import asyncHandler from "../middleware/async.js"
import UserSchema from "../schema/User.schema.js"
import ApiError from "../util/ApiError.js";

const getAll = asyncHandler(async(req , res )=> {
    let page = req.query.page * 1 || 1;
    let limit = req.query.limit * 1 || 5;
    let skip = (page - 1) * limit;
    const data = await UserSchema.find({} , {password : 0}).skip(skip).limit(limit);
    res.status(200).json({
        reslut: data.length,
        page,
        data
    })
    
})


const getME = asyncHandler(async(req , res )=> {

const data = await UserSchema.findOne({_id :req.user.id } , {password : 0});
    res.status(200).json(data)
})

const deleteUser = asyncHandler(async(req , res , next )=> {
    let {id} = req.params;
    const data = await UserSchema.findOneAndDelete({_id :id });
    if(data == null)
    {
        return next(new ApiError(`user ID : ${id} Not Found`))
    }
        
    res.status(200).json({status : `User iD:${id} Deleted sucessfuly`})
    
    
    })


export {
    getAll,
    getME,
    deleteUser
}