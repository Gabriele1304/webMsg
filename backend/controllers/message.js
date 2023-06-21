const User = require('../models/user')
const Message = require('../models/message')
const Chat = require('../models/chat')

module.exports = {

    getAllMessages: (req, res) => {
        Chat.find({members: [req.body.username, req.body.friend_username]}).populate('chat_id')
            .then(r => res.json(r))
    },

    sendMessage: (req, res) => {
        try {
            Chat.findOne({members: [req.body.username, req.body.friend_username]}).then(c => {
                Message.create({message: req.body.message, sender: req.body.username, chat_id: c._id})
                    .then(r => res.json(r))
            })
        } catch (e) {
            console.log(e)
        }
    },


    //old code

    getPostsByUserId: (req, res) => {
        Post.find({author: req.params.userId}).populate(['author', {
            path: 'comments',
            populate: {path: 'author', model: 'User'}
        }])
            .then(r => res.json(r))
    },

    getPostsByUsername: (req, res) => {
        User.findOne({username: req.params.username})
            .then(u => Post.find({author: u._id}).populate(['author', {
                path: 'comments',
                populate: {path: 'author', model: 'User'}
            }]))
            .then(r => res.json(r))
    },

    addComment: async (req, res) => {
        try {
            console.log('Ricevuta richiesta')
            let comment = await Comment.create({
                author: req.body.author,
                description: req.body.description
            })
            const post = await Post.findOne({_id: req.body.postId})
            post.comments.push(comment._id)
            await post.save()
            console.log('Richiesta soddisfatta con contenuto ' + comment)
            comment = await comment.populate('author')
            res.json(comment)
        } catch (error) {
            res.json({"message": "errore"})
        }
    }
}