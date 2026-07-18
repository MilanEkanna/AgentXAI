import express from 'express'
import dotenv from 'dotenv'
import proxy from 'express-http-proxy';

dotenv.config();

const Port = process.env.PORT

const app = express();

app.use('/auth',proxy(process.env.AUTH_SERVICE))

app.listen(Port, ()=>{
    console.log(`Gateway started at Port ${Port}`);
})
