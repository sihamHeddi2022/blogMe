import mongoose from 'mongoose';
import { IUser } from './user';


interface Comment extends mongoose.Document{
    userId:mongoose.Types.ObjectId | IUser;
    content:string;
    reviews:number
}


enum Category{
    health=0,
    education,
    society,
    entertaiment,
    tech,
    politic
}

export interface IPost extends mongoose.Document {
 title: string;
 authorId:mongoose.Types.ObjectId | IUser;
 description: string;
 image: string;
 category:Category;
 comments: Comment[] | undefined
}

const PostSchema: mongoose.Schema<IPost> = new mongoose.Schema({
    title: { type: String,required:true},
    image:{type:String,required:true},
    description:{type:String,required:true},
    category: {type:Number,enum:Category },
    authorId:   {type: mongoose.Schema.Types.ObjectId, ref: 'User',index:true,required:true},
    comments:new  mongoose.Schema<Comment>({
         content: {type:String,required:true},
         reviews:{type:Number,required:true},    
         userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User',index:true,required:true} 
        },{timestamps:true})

},{timestamps:true});

export const PostModel = mongoose.model<IPost>('Post', PostSchema);
