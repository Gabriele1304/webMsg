const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    chat_id: {type: mongoose.Schema.Types.ObjectId, ref: "Chat"},
    sender: {type: String, ref: "User"},
    message: String,
    date: {type: Date, default: Date.now}
})

module.exports = mongoose.model("Message", messageSchema)