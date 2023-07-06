import express from 'express';
import mongoose from 'mongoose';


import dotenv from "dotenv"
import { errorMiddlware } from './middleware/error';
import route from './routes';
import bodyParser from 'body-parser';


dotenv.config()


const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(express.json())

app.use(errorMiddlware)

app.use("/api/v1/",route)

const dbUrl = process.env.DB_URL;

if (!dbUrl) {
  console.error('DB_URL is missing in the environment variables.');
  process.exit(1);
}


app.listen(port,()=>
  {
    mongoose.connect(dbUrl ).then(()=>{
    
  console.log("server is happy now ^__^")
    })
  }
)
