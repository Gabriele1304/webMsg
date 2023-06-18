const express = require('express');
const mongoose = require("mongoose");

const router = require("./routes/api.js");


const dbUrl = "mongodb+srv://messengerApp:messengerApp@messangerapp.sqm2ygw.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dbUrl)
const db = mongoose.connection
db.once("open", () => {
    console.log("Connesso al DB")
})

const app = express()
app.listen(3001, () => {
    console.log("App in ascolto")
})

app.use(express.json())

app.use('/api', router)


