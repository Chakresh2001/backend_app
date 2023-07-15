const express = require('express');
const connectToServer = require('./config/db');
const UserRoute = require('./servers/userroute');
const PostRoute = require('./servers/postRoute');

const app = express()

app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Welcome To My Backend")
})

app.use("/user", UserRoute)

app.use("/posts", PostRoute)

app.listen(process.env.SERVER_PORT, connectToServer)