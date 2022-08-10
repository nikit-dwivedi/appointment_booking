const express = require("express");
const router = express.Router();


const { merchantRegistration, login, logout, getAllMerchant, getMerchantCategory, getMerchantById, editMerchantDetails, changeStatus, merchantBooking, getRatingOfMerchant } = require('../controller/merchant.controller');
const { authenticateMerchant, } = require("../middleware/authToken");
const { validateRegister } = require('../validation/merchantRegistration.validation')


router.get('/', authenticateMerchant, getMerchantById)
router.post('/add', validateRegister('Register'), merchantRegistration)
router.get('/category', getMerchantCategory)
router.post('/login', login)
router.get('/logout', authenticateMerchant, logout)
router.get('/all', getAllMerchant)
router.post('/update', authenticateMerchant, editMerchantDetails)
router.get('/booking', authenticateMerchant, merchantBooking);
router.post('/bookingStatus', authenticateMerchant, changeStatus)

router.get('/review', authenticateMerchant, getRatingOfMerchant)
// router.patch('/addbuissness',authenticateMerchant,buissnessRegister)

module.exports = router;
