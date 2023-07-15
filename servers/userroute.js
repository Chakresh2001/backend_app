const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const UserModel = require('../model/userModel');
const BlackListModel = require('../model/Blacklistmodel');


const UserRoute = express.Router()


UserRoute.post("/register", async(req,res)=>{
    const {name,email,password,city,age} = req.body
    
    const users = await UserModel.findOne({email:email})
  
    if(users){
        return res.status(400).json({error:"User Already Exsists"})
    }

    const user = await UserModel(req.body)

    bcrypt.hash(password, 10, function(err, hash) {
        
        user.password = hash

        user.save()

        res.status(200).json({message:"User Registered", user:user})

    });


})

UserRoute.post("/login", async(req,res)=>{
    const {email, password} = req.body

    const user = await UserModel.findOne({email:email})

    if(!user){
       return res.status(401).json({error:"User Not Registered"})
    }

    bcrypt.compare(password, user.password, function(err, result) {
        if(!result){
            return res.status(402).json({error:"Invalid Password"})
        }

        const token = jwt.sign({ userID: user._id, userName:user.name }, "123")

        res.status(200).json({message:"User Logged In", token : token})
    })
})

UserRoute.post("/logout", async(req,res)=>{
    const token = req.headers.authorization

    const blackListedToken = await BlackListModel.findOne({token:token})

    if(!token){
        return res.status(403).json({error:"Kindly LogIn First"})
    }

    if(blackListedToken){
        return res.status(403).json({error:"Kindly LogIn First"})
    }
    
    const black = await BlackListModel({token:token})

    black.save()

    res.status(200).json({message:"User Logged Out"})
})

module.exports = UserRoute


