import express, { NextFunction, Request, Response } from 'express';




const app = express();
const port = 3000;

app.use(express.json())


class AppError extends Error {
    status:number
    constructor(st:number,message:string){
        super(message)

        this.status=st
    }
}



const users = [
    {
      id:1,
      username:"Ali"
    },
    {
      id:2,
      username:"Mohamed"
    }
]

const errorMiddlware = (err:AppError,req:Request,res:Response,next:NextFunction)=>{
      console.log("jsjjsdjsdj");
      
     return res.status( err.status).json({message:err.message})
}

app.use(errorMiddlware)





app.post("/",(req:Request,res:Response,next:NextFunction)=>{

   const {id,username} = req.body
   const user = users.find(u=>u.id==id)
   console.log(user);
   
   if(user) next(new AppError(400,"id must be unique"))
   else {
    users.push({id,username})
    return res.status(200).json({message:"hello ^__^"})
   }
})



app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});