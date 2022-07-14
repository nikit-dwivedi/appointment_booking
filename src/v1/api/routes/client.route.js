const express = require("express");
const router = express.Router();

const {} = require('../controller/client.controller.js');

router.post('/register',registerUser);

module.exports = router;
