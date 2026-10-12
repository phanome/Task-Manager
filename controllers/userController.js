const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// REGISTER CONTROLLER
const registerController=async (req,res )=>{
    try{
        const{username,email,password}=req.body
        // validation
        if(!username||!email||!password){
            return res.status(500).send({
                success:false,
                message:"Please fill all the fields"

            })
        }
        // Check existing User
        const existingUser=await UserModel.findOne({email})
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:"User already exists"
            })
        }
        // Hashing password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)



        // save user
        const newUser=new UserModel({username,email,password:hashedPassword})
        await newUser.save()
        res.status(201).send({
            success:true,
            message:"User registered successfully",
            newUser
        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while registering user"
        })
    }

}


// LOGIN CONTROLLER

const loginController=async (req,res)=>{
    try{
        const{email,password}=req.body
        // find User
        const user=await UserModel.findOne({email})
        // validation
       
        

  if (!user) {
    return res.status(404).send({
        success: false,
        message: "Invalid email or password"
    });
}
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    // match password
    if (!isPasswordMatch) {
        return res.status(500).json({
            success: false,
            message: "Invalid email or password"
        });
}
        // generate token
        const token= await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
       
        res.status(200).send({
            success:true,
            message:"User logged in successfully",
            token,
            user:{
                id:user._id,
                username:user.username,
                email:user.email
            }
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while logging in user"
        })
    }

}

module.exports={registerController,loginController}