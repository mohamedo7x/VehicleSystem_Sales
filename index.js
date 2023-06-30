import express from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import connectDB from './src/db/mongoose.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json())
app.use(cors());
dotenv.config();




/* Routes */
import AuthRoute from './src/routes/auth.route.js';
app.use(`/${process.env.API}/auth` , AuthRoute);


async function server () {
   
   try {
     const port = process.env.PORT || 5000;
    await connectDB;
    app.listen(port , console.log(`http://localhost:${port}`))
   } catch (error) {
        console.trace(error)
   }
   
    
}
server();