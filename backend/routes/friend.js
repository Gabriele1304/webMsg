const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friend');

router.get('/', (req, res) => {
    
    res.send('Use a POST request to /send or /receive');

}).post('/', (req, res) => {

    console.log("Received a POST request on /api/contacts");

}).post('/send_request', (req, res) => {

    friendController.sendRequest(req, res)

}).post('/get', (req, res) => {

    friendController.getFriendList(req, res)

}).post('/request_response', (req, res) => {

    friendController.requestResponse(req, res)

}).post('/get_pending_requests', (req, res) => {

    friendController.getPendingRequests(req, res)

}).post('/delete', (req, res) => {
    friendController.removeFriend(req, res)
})

module.exports = router
