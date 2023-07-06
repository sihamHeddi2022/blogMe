import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "./error";




export const verifyToken = async(req:Request,res:Response,next:NextFunction)=>{
   
        const authorizationHeader = req.headers.authorization;
         
        if(authorizationHeader?.split(" ")[0]=="Bearer"){
            const token = authorizationHeader.replace('Bearer ', '');
            
            const key:string | any = process.env.PRIVATE_KEY


             jwt.verify(token,key,function(err:any,payload:any){
                if (err) {
                    const e = err as Error
                    if (e.name=="TokenExpiredError") {
                        return res.status(403).json({expired:true})
                   }
                   else {
                    return next(new AppError(401,"invalid token"))

                   }
        
              }
              return next()

            }) 

        }
        else {
            return next(new AppError(401,"verify the authorization header"))
        }     
     
    } 
