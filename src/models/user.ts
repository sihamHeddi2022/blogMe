

import bcrypt from "bcrypt";

import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
 email: string;
 fullName:string;
 password: string;
 refreshToken: string | undefined;
//  image:String | undefined;
}

const UserSchema: mongoose.Schema<IUser> = new mongoose.Schema({
 email: { type: String},
 fullName:{type:String,required:true},
 password: { type: String,required:true,minlength:[5,"password must be at least 5"] },
 refreshToken:{type:String}
//  image : {type:String}
});

const saltRounds = 8

UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, saltRounds);
    }
    next();
   });
export const UserModel = mongoose.model<IUser>('User', UserSchema);
