const express = require("express");
const router = express.Router();

const {registerClient} = require('../controller/client.controller.js');

router.post('/register',registerClient);

module.exports = router;
