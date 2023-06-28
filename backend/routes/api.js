const express = require('express');
const user = require("./user");
const messages = require('./messages');
const friend = require('./friend');
const router = express.Router();
const purgeController = require('../controllers/purge');

router.use("/messages", messages);
router.use("/user", user);
router.use("/friend", friend);
router.get('/', (req, res) => {
    res.send('Use a POST to /api/messages or /api/user');
}).get('/purge', (req, res) => {
    purgeController.purge(req, res)
})

module.exports = router