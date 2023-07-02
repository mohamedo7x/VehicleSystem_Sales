import multer from 'multer';
import ApiError from './ApiError.js';


    function filter (req , file , cb) {
        if(file.mimetype.split('/')[0] === 'image')
        {
            cb( null,true )
        }else {
            cb(new ApiError('File not supported' , 401) , false)
        }
    }

    const storage = multer.memoryStorage();
    const upload = multer({
        storage,
        fileFilter : filter
    })
    
    const uploadOne = upload.single('img');
    const uploadMeny = upload.fields([{name :'img' ,maxCount : 4 }]);
    //const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
export {
    uploadOne,
    uploadMeny
}




