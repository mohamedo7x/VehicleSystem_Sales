

const globalMiddleware  = (error , req , res , next) => {


    const dev = process.env.devMode || 'false';
    let development = dev.startsWith('f') ? false : true;

    if(development === false ) return res.status(error.statusCode).json({
        message: error.message,
        status: error.status,
        error: error,
    })
    
    res.status(error.statusCode).json({
        message: error.message,
        status: error.status,
        error: error,
        stack: error.stack // weher error find
    })
    
}
export default globalMiddleware;