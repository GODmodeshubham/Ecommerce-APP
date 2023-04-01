import express from 'express'
import colors  from 'colors'
import dotenv from "dotenv";
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cors from "cors"
dotenv.config();

connectDB();


const app =express();

app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//all routes
app.use('/api/v1/auth',authRoutes)



app.get("/",(req,res)=>{
res.send("<h1>welcome to ecoomerce website</h1>")
})

const PORT=8080;
app.listen(PORT,()=>{
    console.log(`serverer running on ${PORT} port` );
})
