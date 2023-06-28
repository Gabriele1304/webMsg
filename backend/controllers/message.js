const User = require('../models/user')
const Message = require('../models/message')
const Chat = require('../models/chat')

module.exports = {

    getAllMessages: (req, res) => {
        Chat.find({chat_members: {$all: [req.body.username, req.body.friend_username]}})
            .then(async r => {
                r = await Message.find({chat_id: r[0]._id})
                res.json(r)
            })
    },

    sendMessage: (req, res) => {
        try {
            Chat.findOne({chat_members: {$all: [req.body.username, req.body.friend_username]}}).then(c => {
                if (c == null) throw new Error("Chat non trovata")
                Message.create({message: req.body.message, sender: req.body.username, chat_id: c._id})
                    .then(r => res.json(r))
            })
        } catch (e) {
            console.log(e)
        }
    }
}