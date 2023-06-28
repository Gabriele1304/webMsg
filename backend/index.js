const express = require('express');
const mongoose = require("mongoose");
const router = require("./routes/api.js");

const app = express()
let io = require('socket.io')(app.listen(3001));

const dbUrl = "mongodb+srv://messengerApp:messengerApp@messangerapp.sqm2ygw.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dbUrl)
const db = mongoose.connection
db.once("open", () => {
    console.log("Connesso al DB")
})
app.use(express.json())
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    req.io = io;
    next();
});
app.use('/api', router)
