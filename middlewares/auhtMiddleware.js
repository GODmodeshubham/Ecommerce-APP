import  Jwt  from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn=async (req,res,next)=>{
    try {
        const check=Jwt.verify(req.headers.authorization,process.env.JWT_SECRET)
        req.user=check
    next()
    } catch (error) {
       console.log(error) 
    }
}
export const isAdmin=async (req,res,next)=>{
    try {
        const user=await userModel.findOne(req.user._id)
        if(user.role!==1)
        {
           return  res.status(401).send({
                success:false,
                message:"you are not an admin"
            })
        }
    } catch (error) {
        console.log("error occured durign admin authorization")
    }
}
