import  { NextFunction, Request, Response } from 'express';
import { UserModel } from '../models/user';
import { AppError } from '../middleware/error';
import jwt from 'jsonwebtoken';

import bcrypt from "bcrypt";

export const getRefreshToken = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const user = await UserModel.findOne({_id:req.body.id})
          
        if(!user) return next(new AppError(402,"there is no user with that id"))



        return res.status(200).json({token : user.refreshToken})
    } catch (error) {
     
        return next(new AppError(500,"internal err server"))
    
    }
}

export const disconnect= async (req:Request,res:Response,next:NextFunction)=>{
      try {
          const user = await UserModel.findOne({_id:req.body.id})
          
          if(!user) return next(new AppError(402,"there is no user with that id"))
          user.refreshToken = undefined
          await user.save()
          return res.status(200).json({})
      } catch (error) {
        console.log(error);
        
        return next(new AppError(500,"internal err server"))
      } 
}


export const login = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const {email,password} = req.body
        const user = await UserModel.findOne({email:email})
        

        if(!user) return next(new AppError(401,"the email is not correct"))
        console.log(user);

        const ans = await bcrypt.compare(password,user?.password)
        if(!ans) return next(new AppError(401,"the password is not correct"))

        const key:string | any = process.env.PRIVATE_KEY

        const acessToken = jwt.sign({id:user._id},key,{expiresIn:"3m"})
        
        const refreshToken = jwt.sign({id:user._id},key,{expiresIn:"1y"})
         
        user.refreshToken = refreshToken

        await user.save()
        
        return res.status(200).json({id:user._id,token:acessToken})

    } catch (error) {
        console.log(error);
        
        return next(new AppError(500,"internal err server"))
    }
}




export const register = async (req:Request,res:Response,next:NextFunction)=>{

    const user = req.body
   try {
     const ifExist = await UserModel.findOne({email:user.email})
     if(ifExist) next(new AppError(400,"email must be unique"))
     const u = await new UserModel({...user}).save()
     if(u)  res.status(200).send("yahooo !!")
   } catch (error) {
     if (error instanceof Error) {
       return next(new AppError(400,error.message))
 
     }
   }
 }