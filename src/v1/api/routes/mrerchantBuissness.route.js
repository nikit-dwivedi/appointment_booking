const express = require("express")
const router = express.Router()

const { buissnessRegister}=require('../controller/merchant.buisnessregister.controlle')
const { authenticateMerchant } = require("../middleware/authToken");
router.post('/addbuissness',authenticateMerchant,buissnessRegister)

module.exports = router