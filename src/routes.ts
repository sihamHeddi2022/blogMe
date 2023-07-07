import {Router} from "express";
import { login, register,disconnect, getRefreshToken } from "./controllers/auth";
import { verifyToken } from "./middleware/auth";
import {addPost } from "./controllers/post";



const route = Router()



route.post("/register",register)
route.post("/login",login)


route.post("/disconnect",verifyToken,disconnect)
route.post("/post",verifyToken,addPost)



route.post("/refresh",getRefreshToken)

export default route;