import express from 'express'
import dotenv from 'dotenv'
import proxy from 'express-http-proxy';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import protect from './middleware/auth.middleware.js';
import { getCurrentUser } from './controllers/user.controller.js';

dotenv.config();

const Port = process.env.PORT

const app = express();
app.use(express.json());

app.use(cors({
    origin:process.env.FRONTEND_URL, 
    credentials:true //without this cookies cannot be sent
}))

app.use(cookieParser());
app.use('/api/auth',proxy(process.env.AUTH_SERVICE))
app.get('/api/me', protect, getCurrentUser)

app.listen(Port, ()=>{
    console.log(`Gateway started at Port ${Port}`);
})
