const mongoose = require('mongoose')


const chatSchema = mongoose.Schema({
    chat_id: mongoose.Schema.Types.ObjectId,
    chat_members: [{
        type: String,
        ref: "User"
    }]
})

module.exports = mongoose.model("Chat", chatSchema)