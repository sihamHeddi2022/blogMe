import express, { NextFunction, Request, Response } from 'express';
import { UserModel } from './models/user';
import mongoose from 'mongoose';


import dotenv from "dotenv"
dotenv.config()


const app = express();
const port = 3000;

app.use(express.json())


class AppError extends Error {
    status:number
    constructor(st:number,message:string | any){
        super(message)

        this.status=st
    }
}





const errorMiddlware = (err:AppError,req:Request,res:Response,next:NextFunction)=>{
      console.log("jsjjsdjsdj");
      
      return res.status( err.status).json({message:err.message})
}

app.use(errorMiddlware)





app.post("/",async (req:Request,res:Response,next:NextFunction)=>{

   const user = req.body
  try {
    const ifExist = await UserModel.findOne({email:user.email})
    if(ifExist) next(new AppError(400,"email must be unique"))
    const u = await new UserModel({...user}).save()
    if(u)  res.status(200).send("yahooo !!")
  } catch (error) {
    if (error instanceof Error) {
      next(new AppError(400,error.message))

    }
  }
})

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
