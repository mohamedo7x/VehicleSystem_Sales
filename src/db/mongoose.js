import mongoose from 'mongoose';
import color from 'colors';
import * as dotenv from 'dotenv';
dotenv.config();




 mongoose.set('strictQuery' , false)
.connect(process.env.MONGOOSE_URL)
.then((data)=> {
    console.log(`Data Base Connected ${color.green(data.connection.host)}`)
}).catch((err)=> {
    console.log(`DB ERROR ` +color.red(err))
    process.exit(1)
})



export default mongoose;