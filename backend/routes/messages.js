const express =require('express');
const router = express.Router()
const messageController = require('../controllers/message');
const userController = require('../controllers/user');
router.get('/', (req, res) => {
    res.send('Use a POST request to /send or /receive');

}).post('/', (req, res) => {

    console.log("Received a POST request on /api/messages");

}).post('/send', (req, res) => {

    messageController.sendMessage(req, res)

}).post('/receive', (req, res) => {

    messageController.getAllMessages(req, res)

})

module.exports = router
