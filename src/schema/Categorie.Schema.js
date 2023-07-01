import mongoose from "mongoose";

const CategorieSchema = mongoose.Schema({

    name : {
        type : String
    },
    description : {
        type : String
    }


} , {timestamps:true})

export default mongoose.model('Categorie' ,CategorieSchema )