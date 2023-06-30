import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const UserSchema = mongoose.Schema({
    username : {
        type :String,
    },
    password : {
        type : String
    },
    email : {
        type : String
    },
    isAdmin : {
        type :Boolean,
        default : false 
    },
    img : {
        type : String,
        default : 'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png'
    }
} ,  {timestamps:true})

UserSchema.pre('save' , async function (next) {
    try {
    const hashPassword = await bcrypt.hash(this.password , 10);
    this.password = hashPassword;
    next();
    } catch (error) {
        next(error);
    }

})
export default mongoose.model('User' , UserSchema);