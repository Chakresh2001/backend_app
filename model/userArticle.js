const mongoose = require('mongoose');

const USerArticleSchema = mongoose.Schema({
    title : {type:String, required:true},
    body : {type:String, required:true, unique:true},
    user : {type:String},
    userId : {type:mongoose.Schema.Types.ObjectId, ref:"user"},
    category : {type:String, required:true},
    live:{type:Boolean, required:true}
})


const USerArticleModel = mongoose.model("article", USerArticleSchema)

module.exports = USerArticleModel