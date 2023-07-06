import {Router} from "express";
import { login, register,disconnect, getRefreshToken } from "./controllers/auth";
import { verifyToken } from "./middleware/auth";



const route = Router()



route.post("/register",register)
route.post("/login",login)
route.post("/disconnect",verifyToken,disconnect)
route.post("/refresh",getRefreshToken)

export default route;