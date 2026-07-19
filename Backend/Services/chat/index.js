import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';

dotenv.config();

const Port = process.env.PORT

const app = express();
app.use(express.json());

app.listen(Port,()=>{
    console.log(`Chat listen on Port ${Port}`);
    connectDB()
})