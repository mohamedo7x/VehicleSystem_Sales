import asyncHandler from '../middleware/async.js'
import User from '../schema/User.schema.js';

const register =asyncHandler(async(req , res) => {
    res.json({
        res : 'PERFECTO'
    })
})

const login =asyncHandler(async(req , res) => {
    res.json({
        res : 'PERFECTO'
    })
})


export {
    register,
    login
}