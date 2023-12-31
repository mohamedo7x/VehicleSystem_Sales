import express from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import  Color  from 'colors';
import ApiError from './src/util/ApiError.js';
import connectDB from './src/db/mongoose.js'
import errorHandling from './src/middleware/expressError.middleware.js';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json())
app.use(cors());
app.use(express.static(path.join(__dirname , 'images')) )
dotenv.config();




/* Routes */
import AuthRoute from './src/routes/auth.route.js';
import CategorieRoute from './src/routes/categorie.route.js'
import SubCategorieRoute from './src/routes/Subcategorie.route.js'
import ProdcutRoute from './src/routes/product.route.js'
import UserRoute from './src/routes/user.route.js'

app.use(`/${process.env.API}/auth` , AuthRoute);
app.use(`/${process.env.API}/categorie` , CategorieRoute);
app.use(`/${process.env.API}/subcategorie` , SubCategorieRoute);
app.use(`/${process.env.API}/product` , ProdcutRoute);
app.use(`/${process.env.API}/user` , UserRoute);

app.get('/helthz' , (req , res)=> {res.status(200).send('OK')})

app.use('*' , (req , res , next)=> {
   next(new ApiError(`Route ${req.url}  Not exisit` , 404))
})
app.use(errorHandling);
async function server () {
   
   try {
     // const port = process.env.PORT || 5000;
     connectDB;
     console.log(Color.green('enjoy ;)'))
    app.listen(process.env.PORT || 3000 , console.log(`http://localhost:3000`))
   } catch (error) {
        console.log(error)
   }
   
    
}
server();
