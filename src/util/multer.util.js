import multer from 'multer';
import ApiError from './ApiError.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

function filter(req, file, cb) {
    if (file.mimetype.split('/')[0] === 'image') {
        cb(null, true)
    } else {
        cb(new ApiError('File not supported', 401), false)
    }
}

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    fileFilter: filter
})

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join( __dirname , '..' , 'images' , 'Product');
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, `img-${Date.now()}.${file.mimetype.split('/')[1]}`)
    }
})
const upload2 = multer({storage : multerStorage , fileFilter : filter});

const uploadOne = upload.single('img');
const uploadMeny = upload2.array('images', 4);
//const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
export {
    uploadOne,
    uploadMeny
}




