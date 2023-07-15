const mongoose = require('mongoose');
require('dotenv').config();

const connectToServer = ()=>{
    mongoose.connect(process.env.MONGODB_DATABASE_SITE_LINK)
    console.log("server is running")
}

module.exports = connectToServer