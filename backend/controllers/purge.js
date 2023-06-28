const User = require('../models/user')
const Message = require('../models/message')
const Chat = require('../models/chat')
const friend_list = require('../models/friend_list')

module.exports = {
    purge: (req, res) => {
        User.deleteMany({}).then(r=> {
            console.log("deletemany")
            console.log(r)
        })
        Message.deleteMany({})
        Chat.deleteMany({})
        friend_list.deleteMany({})
        res.json({message: "Database purged"})
    }
}