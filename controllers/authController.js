import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";
import  Jwt from "jsonwebtoken";
export const registerController=async(req,res)=>{
  try{const {name ,email,address,phone,password}=req.body;

  if(!name)
  {
    res.send({message:'name is required'})
  }
  if(!email)
  {
    res.send({message:'email is required'})
  }
  if(!phone)
  {
    res.send({message:'phone is required'})
  }
  if(!password)
  {
    res.send({message:'password is required'})
  }
  if(!address)
  {
    res.send({message:'address is required'})
  }
  const existingEmail=await userModel.findOne({email});
  if(existingEmail)
  {
    res.status(200).send({
        success:false,
        message:"user already exist"
    })
  }
  const hashedPassword=await hashPassword(password)
  const user=await new userModel({name,email,password:hashedPassword,phone,address}).save()
  res.status(201).send({
    success:true,
    messsage:'User registered successfully',
    user
  })
 
}
  catch(error){
    console.log(error);
    res.status(500).send({
        success:false,
        messsage:"Error in registration",
        error
    })
  }
}
export const loginController=async (req,res)=>{
try {
    const {email,password}=req.body;
    if(!email)
    {
        res.send({error:"invalid usernasme or password"})
    }
    if(!password)
    {
        res.send({error:"invalid usernasme or password"})
    }
    const user=await userModel.findOne({email});
    if(!user)
    {
        res.send({error:"invalid email or password"});
    }
    const match=await comparePassword(password,user.password);
    if(!match)
    {
        res.status(200).send({
            success:false,
            message:"invlaid username or password"
        })
    }
    console.log(process.env.JWT_SECRET)
    const token=await Jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
    res.status(200).send({
      success:true,
      message:'login successfully',
      user:{
          name:user.name,
          email:user.email,
          phone:user.phone,
          address:user.address
      },token
    })

    
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"error occured during login",
        error
    })
}    
}