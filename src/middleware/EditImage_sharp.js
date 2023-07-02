import sharp from "sharp";



const edit = async (req , res , next) => {
    
        await sharp(req.file.buffer)
        .resize(500 , 500)
        .toFormat('png')
        .toFile(`./images/subcategorie/sub-cat-${Date.now()}.png`);
        req.body.img = `sub-cat-${Date.now()}.png`;
        next();
  

}
export default edit;