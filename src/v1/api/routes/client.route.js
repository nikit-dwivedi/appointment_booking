const express = require("express");
const router = express.Router();


const {registerClient, clientLogin, getClientById, editClientInfo} = require('../controller/client.controller.js');

router.post('/register',registerClient);
router.post('/login',clientLogin);
router.get('/',getClientById);
router.post('/update',editClientInfo)


module.exports = router;

