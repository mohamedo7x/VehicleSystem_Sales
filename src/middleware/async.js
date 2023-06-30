


const asyncHandler = (route) => {
    return async function(req , res , next){
        try {
           await route(req , res) 
        } catch (error) {
            next(error)
        }
    }
}

export default asyncHandler;