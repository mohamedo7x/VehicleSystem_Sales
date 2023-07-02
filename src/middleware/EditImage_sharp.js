import sharp from "sharp";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

import SubcategorieSchema from "../schema/Subcategorie.schema.js";
import ApiError from "../util/ApiError.js";


const editOne = async (req , res , next) => {
        if(req.file === undefined)
        {
               return next();
        }
       const data = await SubcategorieSchema.findOne({_id : req.params.id});
       if(data !== null)
       {
        const filePath = path.join(__dirname , '..', 'images' , 'subcategorie' ,`${data.img}`)
        fs.unlinkSync(filePath);
       }
       

        const filename = `sub-cat-${Date.now()}.png`;
        await sharp(req.file.buffer)
        .resize(500 , 500)
        .toFormat('png')
        .toFile(`./src/images/subcategorie/${filename}`);
        req.body.img = filename;
        next();
  

}

const filterImages = async (req , res , next) => {
        const AllFile = req.files;
        let imageArray = [];

        AllFile.forEach(element => {
           imageArray.push(element.filename);  
        });
        req.body.images = imageArray;
        next();
}
export {
editOne,
filterImages
} 