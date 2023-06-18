const messages = require('./messages');
const express = require('express');
const router = express.Router();

router.use("/messages", messages);

module.export = router;