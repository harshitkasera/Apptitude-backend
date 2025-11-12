const Usermodel = require("../model/UserModel")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saveUser = async(req,res)=>{
    const {name, email, password}=req.body;
    try{
        const hashedpassword = await bcrypt.hash(password,10)
        const newUser = new Usermodel({
            name,
            email,
            password : hashedpassword
        })
    await newUser.save()
    res.status(200).json({message: "user register successfuly"})
    }
    catch(error){
        res.status(500).json({message: "user existing error", error: error.message})
    }
};
const loginUSer = async(req,res)=>{
    const {email, password}= req.body;
    try{
        const user =  await Usermodel.findOne ({email});
        if(!user){     
             res.status(404).json({message: "user not found"})
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword){
            return res.status(401).json({message: "incorrect password"})
        }
        const token = jwt.sign({id: user._id, email: user.email}, "our_secret_key",{expiresIn:"1h"})
        return res.status(200).json({message: "Login successuly", user:{
                _id: user._id,
         name: user.name,
         email: user.email,
         createdAt: user.createdAt,
        }, "token": token})
    }
    catch(error){
            return res.status(500).json({message: "Login failed", error: error.message})
        
    }
}
module.exports = {loginUSer, saveUser}