const friend_list = require('../models/friend_list');
const Chat = require('../models/chat');
const User = require('../models/user');

function addFriendQuery(username, friend_username) {
    friend_list.findOneAndUpdate({
        username: username
    }, {
        $addToSet: {
            friend_list: {friend_username: friend_username}
        }
    }).then(
        r => {
            return r
        }
    )
}

function removeFriendQuery(username, friend_username) {
    friend_list.findOneAndUpdate({
        username: username
    }, {
        $pullAll: {
            friend_list: {friend_username: friend_username}
        }
    }).then(r => {
        return r
    })
}

function addFriendRequestQuery(username, friend_username, isRequester) {
    friend_list.findOneAndUpdate({
        username: username
    }, {
        $addToSet: {
            friend_requests: {friend_username: friend_username, isRequester: isRequester}
        }
    }).then(
        r => {
            return null
        }
    )
}

function removeFriendRequestQuery(username, friend_username) {
    return friend_list.findOneAndUpdate({
        username: username
    }, {
        $pull: {
            friend_requests: {friend_username: friend_username}
        }
    }).then(r => console.log(r))
}

async function checkIfPending(username, friend_username) {
    let table = await friend_list.find({
        "username": username, "friend_requests.friend_username": friend_username
    })
    if (table.length > 0) {
        return true
    } else {
        return false
    }
}

async function checkIfFriend(username, friend_username) {
    let table = await friend_list.find({
        username: username, "friend_list.friend_username": friend_username
    })
    if (table.length > 0) {
        return true
    } else {
        return false
    }
}

async function checkIfFriendOrPending(username, friend_username) {
    let ckfriend = await checkIfFriend(username, friend_username)
    let chifpend = await checkIfPending(username, friend_username)
    if (ckfriend || chifpend)
        return true
    else return false
}

async function createChat(username, friend_username) {
    await Chat.create({chat_members: [username, friend_username]})
}

module.exports = {
    sendRequest: async (req, res) => {
        let friendtable = await User.findOne({username: req.body.friend_username})
        if (req.body.username == req.body.friend_username) { //non puoi inviare richieste a te stesso
            res.json({message: "Non puoi inviare richieste a te stesso"});
        } else if (friendtable == null) {  //controlla se l'username è esistente
            res.json({message: "Username non esistente"});
        } else {
            if (await checkIfFriendOrPending(req.body.username, req.body.friend_username) || await checkIfFriendOrPending(req.body.friend_username, req.body.username)) { //controlla se l'utente è già amico
                console.log("Richiesta già presente o già amici")
                res.json({message: "Richiesta già presente o già amici"});
            } else {
                //invia la richiesta
                await addFriendRequestQuery(req.body.username, req.body.friend_username, true)
                await addFriendRequestQuery(req.body.friend_username, req.body.username, false)
                console.log("Richiesta inviata")
                res.json({message: "Richiesta inviata", refresh: true});
            }
        }

    },

    requestResponse: async (req, res) => {
        const [username, friend_username] = [req.body.username, req.body.friend_username]
        if (req.body.accept_status) {
            addFriendQuery(username, friend_username)
            removeFriendRequestQuery(username, friend_username)
            addFriendQuery(friend_username, username)
            removeFriendRequestQuery(friend_username, username)
            await createChat(username, friend_username)
            res.json({message: "Richiesta accettata"})
        } else {
            console.log("Richiesta rifiutata")
            removeFriendRequestQuery(username, friend_username)
            removeFriendRequestQuery(friend_username, username)
            res.json({message: "Richiesta rifiutata"})
        }
    },

    getFriendList: (req, res) => {
        friend_list.find({username: req.body.username}, {friend_list: 1})
            .then(r => res.json(r))

    },

    getPendingRequests: (req, res) => {
        friend_list.find({username: req.body.username}, {friend_requests: 1})
            .then(r => {
                if (r[0].friend_requests.length > 0) {
                    res.json(r)
                } else {
                    res.json({error: "Non ci sono richieste in attesa"})
                }
            })

    }
}