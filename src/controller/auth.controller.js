import asyncHandler from '../middleware/async.js'
import ApiError from '../util/ApiError.js';
import bctypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import UserShcema from '../schema/User.schema.js';

const register = asyncHandler(async (req, res) => {
    const Create = await new UserShcema(req.body);
    await Create.save();
    res.status(201).json({
        Sucess : 'User Created successfully'
    });
})

const login = async (req, res, next) => {


    const user = await UserShcema.findOne({ username: req.body.username });
    if (user === null) {
        return next(new ApiError('Username Or Password Not correct', 400))
    }
    if (!bctypt.compareSync(req.body.password, user.password)) {
        return next(new ApiError('Username Or Password Not correct', 400))
    }
    const Token = await JWT.sign({
        id: user._id,
        username: user.username,
        isAdmin: user.isAdmin
    }, process.env.SECRET_KEY, {
        expiresIn: "1d"
    });
    res.status(200).json({Token})
}


export {
    register,
    login
}