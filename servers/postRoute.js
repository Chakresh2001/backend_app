const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const UserModel = require('../model/userModel');
const BlackListModel = require('../model/Blacklistmodel');
const USerArticleModel = require('../model/userArticle');
const auth = require('../middleware/auth');


const PostRoute = express.Router()



PostRoute.post("/add",auth, async(req,res)=>{

    const {userID, userName} = req.userData

    const posts =  USerArticleModel({...req.body, userId:userID, user:userName})

    await posts.save()

    res.json({posts:posts})
    
})

PostRoute.get("/get", auth, async(req,res)=>{

    const {userID} = req.userData

    const user = await USerArticleModel.find({userId:userID})

    res.json({message:user})    

})

PostRoute.get("/get/article/:id",auth, async(req,res)=>{
    const {id} = req.params

    const article = await USerArticleModel.findById(id)

    res.json({message:article})
})


PostRoute.patch("/article/edit/:id",auth, async(req,res)=>{

    const {id} = req.params

    const UpdatedArticle = await USerArticleModel.findByIdAndUpdate(id, req.body)

    res.json({message:UpdatedArticle})

})
PostRoute.delete("/article/delete/:id",auth, async(req,res)=>{

    const {id} = req.params

    await USerArticleModel.findByIdAndDelete(id)

    res.send("Article Deleted")

})




module.exports = PostRoute