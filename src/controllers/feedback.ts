import { NextFunction, Request, Response } from "express";
import { Comment, IPost, PostModel } from "../models/post";
import { AppError } from "../middleware/error";




export const addFeedBack =  async (req:Request | any  ,res:Response,next:NextFunction)=>{
   try {
    const post:IPost | any = await PostModel.findOne({_id:req.params.id})
    if(!post)   return next(new AppError(400,"there is no post with this id"))
    
    post.comments.push({
      content : req.body.content,
      reviews : req.body.reviews,
      userId:req.user
    })

    post.save().then(()=> res.status(200).json({}))
   } catch (error) {
    console.log(error);
        
    return next(new AppError(500,"internal err server"))
   }

}

export const deleteYourFeedBack = async (req:Request | any  ,res:Response,next:NextFunction)=>{
      
    try {
        const post:IPost | any = await PostModel.findById(req.params.id)
        if(!post)   return next(new AppError(404,"there is no post with this id"))
        
         console.log(req.user);
         
        const index =  post.comments.findIndex((e:Comment)=>e._id == req.params.fid &&  e.userId == req.user)
         
        if (index<0)  return next(new AppError(402,"you don't have permissions"))
        
           post.comments.pull(req.params.fid)

            
             post.save().then(()=> res.status(200).json({}))

    } catch (error) {
        console.log(error);
            
        return next(new AppError(500,"internal err server"))
    }


}

export const updateYourFeedBack =  async (req:Request | any  ,res:Response,next:NextFunction)=>{

    try {
        const post:IPost | any = await PostModel.findOne({_id:req.params.id})
        if(!post)   return next(new AppError(404,"there is no post with this id"))
        
     
        const index =  post.comments.findIndex((e:Comment)=>e._id == req.params.fid &&  e.userId == req.user)
         
        if (index<0)  return next(new AppError(402,"you don't have permissions"))

        post.comments[index].content = req.body.content
        post.comments[index].reviews = req.body.reviews

        post.save().then(()=> res.status(200).json({}))
       } catch (error) {
        console.log(error);
            
        return next(new AppError(500,"internal err server"))
       }

}