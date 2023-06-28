const express = require('express');
const mongoose = require("mongoose");
const router = require("./routes/api.js");
const cookieSession = require('cookie-session')
const Keygrip = require('keygrip')


const app = express()
let io = require('socket.io')(app.listen(3001));

const dbUrl = "mongodb+srv://messengerApp:messengerApp@messangerapp.sqm2ygw.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dbUrl)
const db = mongoose.connection
db.once("open", () => {
    console.log("Connesso al DB")
})
app.use(express.json())
app.use(cookieSession({
    name: 'session',
    keys: new Keygrip(['key1', 'key2'], 'SHA384', 'base64'),

    maxAge: 24 * 60 * 60 * 1000
}))
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "https://web-msg.vercel.app");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    req.io = io;
    req.db = db;
    next();
});
app.use('/api', router)

module.exports = app
