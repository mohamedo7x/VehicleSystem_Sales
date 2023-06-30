import asyncHandler from '../middleware/async.js'

const register =asyncHandler(async(req , res) => {
console.log('12222222');
})

const login =asyncHandler(async(req , res) => {

})


export {
    register,
    login
}