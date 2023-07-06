import express, { NextFunction, Request, Response } from 'express';



export class AppError extends Error {
    status:number
    constructor(st:number,message:string | any){
        super(message)

        this.status=st
    }
}

export const errorMiddlware = (err:AppError,req:Request,res:Response,next:NextFunction)=>{
    console.log("jsjjsdjsdj");
    
    return res.status( err.status).json({message:err.message})
}