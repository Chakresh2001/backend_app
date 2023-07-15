const BlackListModel = require("../model/Blacklistmodel")
const UserModel = require("../model/userModel")
const jwt = require('jsonwebtoken');

const auth = async(req,res,next)=>{

    const token = req.headers.authorization

    const black = await BlackListModel.findOne({token:token})

    if(black){
        return res.status(403).json({error:"Kindly LogIn First"})
    }


    jwt.verify(token, '123', function(err, decoded) {
        if(!decoded){
            return res.status(404).json({error:"Invalid Token"})
        }
        req.userData = decoded
        next()
    });

}

module.exports = auth