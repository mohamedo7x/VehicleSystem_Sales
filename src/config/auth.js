import JWT from 'jsonwebtoken';
import ApiError from '../util/ApiError.js';
import UserSchema from '../schema/User.schema.js';

const protectRoute = async (req, res, next) => {
    try {
        const head = req.headers.authorization;
        if (!head) {
            return next(new ApiError('Token NotFound', 400))
        }
        const token =await JWT.verify(head.split(' ')[1], process.env.SECRET_KEY);
        if (!token) {
            return next(new ApiError('Invalid Token', 400))
        }
        const user = await UserSchema.findOne({username : token.username});
        if (user === null) {
            return next(new ApiError('Bad Token User Not Found', 400))
        }
        req.user = token;
        next();
    } catch (error) {
      next(error)
    }

}

const acess =async (req, res, next) => {
  try {
        const token =await JWT.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY);
    if(token.isAdmin === false)
    {
        return next(new ApiError('unauthenticated' , 400))
    }
    next();
  } catch (error) {
    next(error)
  }

  
    
}
export {
    acess,
    protectRoute
}