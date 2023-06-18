const express =require('express');
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Use a POST request to /messages');


}).post('/', (req, res) => {
    console.log("Received a POST request on /api/messages");

})

module.export = router;
