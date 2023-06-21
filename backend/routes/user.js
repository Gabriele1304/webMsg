const express =require('express');
const router = express.Router()
const userController = require('../controllers/user');

router.get('/', (req, res) => {
    res.send('Use a POST request to /login or /register');


}).post('/', (req, res) => {
    console.log("Received a POST request on /api/messages");

}).post('/login', (req, res) => {
    console.log("login request")
    userController.login(req, res)

}).post('/register', (req, res) => {
    console.log("register request")
    userController.register(req, res)
})

module.exports = router