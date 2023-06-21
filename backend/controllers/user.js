const User = require('../models/user')
const friend_list = require('../models/friend_list')

module.exports = {
    login: (req, res) => {
        User.findOne({username: req.body.username})
            .then(user_table => {
                console.log(user_table);
                if (user_table == null) res.status(404).json({error: "Username non esistente"});
                else {
                    const passwordcheck = user_table.password === req.body.password;
                    if (passwordcheck) {
                        res.status(200).json({id: user_table._id, username: user_table.username});
                    } else res.status(401).json({error: "Password non corretta"});

                }
            })
    },

    register: (req, res) => {
        console.log(req.body)
        User.findOne({username: req.body.username}).then(r => {
            if (r == null) {
                User.create({username: req.body.username, password: req.body.password})
                friend_list.create({
                    username: req.body.username,
                    friend_requests: [],
                    friend_list: [],
                })
                res.status(200).json({username: req.body.username})
            } else res.status(401).send("Username già esistente")
        })

    }
}