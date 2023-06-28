const User = require('../models/user')
const friend_list = require('../models/friend_list')
const bcrypt = require('bcrypt');

module.exports = {
    login: (req, res) => {
        User.findOne({username: req.body.username})
            .then(async user_table => {
                console.log(user_table);
                if (user_table == null) res.status(404).json({error: "Username non esistente"});
                else {
                    const passwordcheck = await bcrypt.compare(req.body.password, user_table.password);
                    if (passwordcheck) {
                        req.session.user = user_table.username;
                        req.session.id = user_table._id;
                        res.status(200).json({id: user_table._id, username: user_table.username});
                    } else res.status(401).json({error: "Password non corretta"});
                }
            })
    },

    register: (req, res) => {
        console.log(req.body)
        if (req.body.password == '' || req.body.username == '')
            res.status(400).json({error: "Inserire username e password"});
        else {
            User.findOne({username: req.body.username}).then(async r => {
                if (r == null) {
                    const hashedPassword = await bcrypt.hash(req.body.password, 10);
                    User.create({username: req.body.username, password: hashedPassword})
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
}