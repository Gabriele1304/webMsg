const friend_list = require('../models/friend_list');
const Chat = require('../models/chat');


module.exports = {
    sendRequest: async (req, res) => {
        let friend_query = await friend_list.find({
            username: req.body.username, $or: {
                friend_requests: [{friend_username: req.body.friend_username}],
                friend_list: [{friend_username: req.body.friend_username}]
            }
        })
        if (friend_query == null) {
            await friend_list.findOneAndUpdate({
                username: req.body.friend_username,
            }, {
                $addToSet: {
                    friend_requests: [{
                        friend_username: req.body.username
                    }]
                }
            })
            await friend_list.findOneAndUpdate({
                username: req.body.username
            }, {
                $addToSet: {
                    friend_requests: [{
                        friend_username: req.body.friend_username,
                        isRequester: true
                    }]
                }
            })
        } else res.send("Richiesta già presente o già amici")

    },

    requestResponse: async (req, res) => {
        if (req.body.accept_status) {
            let friend_list_result = await friend_list.findOne({username: req.body.username});
            await friend_list_result.updateOne({
                $push: {
                    friend_list: {friend_username: req.body.friend_username, response_date: Date.now()},
                },
                $pull: {
                    friend_requests: {friend_username: req.body.friend_username},
                }
            })
            friend_list_result = await friend_list.findOne({username: req.body.friend_username})
            await friend_list_result.updateOne({
                $push: {
                    friend_list: {friend_username: req.body.username, response_date: Date.now()},
                },
                $pull: {
                    friend_requests: {friend_username: req.body.username},
                }
            })
            await Chat.create({chat_members: [req.body.username, req.body.friend_username]})
            res.json("Richiesta accettata")
        } else {
            friend_list.findOneAndUpdate({username: req.body.username}, {
                $pull: {
                    friend_requests: {friend_username: req.body.friend_username, response_date: Date.now()},
                }
            }).then(f => res.json(f))
        }
    },

    getFriendList: (req, res) => {
        friend_list.find({username: req.body.username}, {friend_list: 1})
            .then(r => res.json(r))

    },

    getPendingRequests: (req, res) => {
        friend_list.find({username: req.body.username}, {friend_requests: 1})
            .then(r => res.json(r))

    }
}