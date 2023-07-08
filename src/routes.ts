import {Router} from "express";
import { login, register,disconnect, getRefreshToken } from "./controllers/auth";
import { verifyToken } from "./middleware/auth";
import {addPost, deletePost, updateImgPost, updatePost } from "./controllers/post";
import { addFeedBack, deleteYourFeedBack, updateYourFeedBack } from "./controllers/feedback";



const route = Router()



route.post("/register",register)
route.post("/login",login)
route.post("/refresh",getRefreshToken)
route.post("/disconnect",verifyToken,disconnect)



route.post("/post",verifyToken,addPost)
route.route("/post/:id").put(verifyToken,updatePost)
.delete(verifyToken,deletePost)
route.put("/post/:id/img",verifyToken,updateImgPost)



route.post("/post/:id/feedback",verifyToken,addFeedBack)
route.route("/post/:id/feedback/:fid")
.put(verifyToken,updateYourFeedBack)
.delete(verifyToken,deleteYourFeedBack)


















export default route;