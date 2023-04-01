import  express  from "express";
import  {loginController, registerController}  from "../controllers/authController.js";
import {isAdmin, requireSignIn} from "../middlewares/auhtMiddleware.js";

const router=express.Router()
router.post('/login', requireSignIn, isAdmin, loginController)
router.post('/register',  registerController)

export default router