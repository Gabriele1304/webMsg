const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    creationDate: Date,
})

module.exports = mongoose.model("User", userSchema)