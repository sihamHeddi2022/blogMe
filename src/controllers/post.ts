import { NextFunction, Request, Response } from "express";
import { IPost, PostModel } from "../models/post";
import { AppError } from "../middleware/error";





export const getAllPostsOfUser= async (req:Request | any ,res:Response,next:NextFunction)=>{
    try {
        const posts = await PostModel.find({authorId:req.user})
        if(!posts)   return next(new AppError(400,"there is no author with this id"))
        return res.status(200).json(posts)
    
    } catch (error) {
        console.log(error);
        
        return next(new AppError(500,"internal err server"))
    } 

}

export const getPostById = async (req:Request,res:Response,next:NextFunction)=>{
   try {
    const post:IPost | any = await PostModel.findOne({_id:req.params.id})
    if(!post)   return next(new AppError(400,"there is no post with this id"))
    return res.status(200).json(post)

    } catch (error) {
        console.log(error);
        
        return next(new AppError(500,"internal err server"))
    } 

}

export const getAllpostsWithQuery=async (req:Request,res:Response,next:NextFunction)=>{
    try {
       const {keyword,category}= req.params
       console.log(typeof keyword);
       
        const matchingPosts = await PostModel.find({ title: { $regex: keyword, $options: "i" }, category: category });
       if(matchingPosts) return res.status(200).json(matchingPosts)
    } catch (error) {
        console.log(error);
        
        return next(new AppError(500,"internal err server"))  
        
    } 
}


export const getPopularPosts=async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const matchingPosts = await PostModel.find({ "comments.reviews": { $gte: 4, $lte: 5 } }).limit(6);
        
        if(matchingPosts) return res.status(200).json(matchingPosts)
    } catch (error) {
        console.log(error);
        
        return next(new AppError(500,"internal err server"))  
    } 
}
;

export const addPost=async (req:Request | any,res:Response,next:NextFunction)=>{
    try {
       const p= {...req.body,authorId:req.user}
       
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
 

export const updateImgPost=async (req:Request | any ,res:Response,next:NextFunction)=>{
    try {
        const post:IPost | any = await PostModel.findOne({_id:req.params.id})
        if(!post)   return next(new AppError(400,"there is no post with this id"))
        
        
        const file = req.files.file
        

        const ext = file.name.split(".")[1]
 
        file.name = new Date().getTime()+"."+ext
        file.mv("./db/images/posts/"+file.name,async(err:Error | any)=>{
            if(err) throw err
            post.image = "db/images/posts/"+file.name
            await post.save()
            return res.status(200).json({})
        }); 
    } catch (error) {
        console.log(error);
        
        return next(new AppError(500,"internal err server"))
    } 
}
;



export const updatePost=async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const post:IPost | any = await PostModel.findOne({_id:req.params.id})
        if(!post)   return next(new AppError(400,"there is no post with this id"))
        
        const {category,description,title} = req.body
        post.category = category
        post.description = description
        post.title = title
         post.save().then(()=> res.status(200).json({}))
    } catch (error) {
        console.log(error);
        
        return next(new AppError(500,"internal err server"))
    } 
}
;

export const deletePost=async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const post:IPost | any = PostModel.findOne({_id:req.params.id})
        if(!post)   return next(new AppError(400,"there is no post with this id"))
        PostModel.deleteOne({_id:req.params.id}).then(()=>res.status(200).json({}))
    } catch (error) {
        console.log(error);
        
        return next(new AppError(500,"internal err server"))
    } 
}
;
