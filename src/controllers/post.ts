import { NextFunction, Request, Response } from "express";
import { PostModel } from "../models/post";
import { AppError } from "../middleware/error";



export const getAllpostsWithQuery=async (req:Request,res:Response,next:NextFunction)=>{
    try {
     
    } catch (error) {
    
    } 
}


export const getPopularPosts=async (req:Request,res:Response,next:NextFunction)=>{
    try {
     
    } catch (error) {
    
    } 
}
;

export const addPost=async (req:Request | any,res:Response,next:NextFunction)=>{
    try {
       const p= req.body
       
       const file = req.files.file
        

       const ext = file.name.split(".")[1]

       file.name = new Date().getTime()+"."+ext
       file.mv("./db/images/posts/"+file.name,async(err:Error | any)=>{

        

        if(err) throw err
        
       const post = await new PostModel({...p,image:"db/images/posts/"+file.name}).save()
        
         if(post) return res.status(200).json({id:req.user})


       })
       
    } catch (error) {
        console.log(error);
        
        return next(new AppError(500,"internal err server"))
    } 
}
;

export const updatePost=async (req:Request,res:Response,next:NextFunction)=>{
    try {
     
    } catch (error) {
    
    } 
}
;

export const deletePost=async (req:Request,res:Response,next:NextFunction)=>{
    try {
     
    } catch (error) {
    
    } 
}
;
