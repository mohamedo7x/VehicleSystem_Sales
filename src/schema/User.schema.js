import mongoose from "mongoose";

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
    }
} ,  {timestamps:true})


export default mongoose.model('User' , UserSchema);