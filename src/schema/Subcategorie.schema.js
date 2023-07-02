import mongoose from "mongoose";

const SubcategorieSchema = mongoose.Schema({

    name : {
        type : String
    },
    img : {
        type : String
    },
    categorie : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Categorie'
    }
    ,
    description : {
        type : String
    }


} , {timestamps:true})

export default mongoose.model('Subcategorie' ,SubcategorieSchema )