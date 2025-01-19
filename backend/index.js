import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import router from './routes/userRoute.js';
import cors from 'cors'
const PORT = process.env.PORT || 3000;

const app = express()
app.use(express.json());
dotenv.config()
app.use(cors())


//DB CONNECTION
connectDb(process.env.MONGO_DB_URI)

//Routes
app.use("/api/auth",router)



app.listen(PORT,()=>{
    console.log(`app is running at port ${PORT}`)
});


