import mongoose from "mongoose";




const ProductSchema = mongoose.Schema({

name : {
    type : String
},
description : {
    type : String
},
model :{
    type : String
},
year : {
    type : Number
},
kilometrs : {
    type : Number
},
price : {
    type : Number
},
images : {
    type : [String]
},
categorie : {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Categorie'
},
subcategorie : {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Subcategorie'
}


},  {timestamps:true})

export default mongoose.model('Product',ProductSchema)