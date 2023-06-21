const mongoose = require('mongoose')


const friend_listSchema = mongoose.Schema({
    username: String,
    friend_list: [{friend_username: {type: String, ref: "User"}, response_date: {type: Date, default: Date.now}}],
    friend_requests: [{friend_username: {type: String, ref: "User"}, request_date: {type: Date, default: Date.now}, isRequester: {type: Boolean, default: false}}],
})

module.exports = mongoose.model("Friend_list", friend_listSchema)