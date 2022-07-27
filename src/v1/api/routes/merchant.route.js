const express = require("express");
const router = express.Router();


const{merchantRegistration,login,logout, getAllMerchant, getMerchantCategory, getMerchantById,  editMerchantDetails, changeStatus}=require('../controller/merchant.controller');
const { authenticateMerchant,} = require("../middleware/authToken");
const{validateRegister} = require('../validation/merchantRegistration.validation')


router.get('/',authenticateMerchant,getMerchantById)
router.post('/add',validateRegister('Register'),merchantRegistration)
router.get('/category',getMerchantCategory)
router.post('/login',login)
router.get('/logout',authenticateMerchant,logout)
router.get('/all',getAllMerchant)
router.post('/update',authenticateMerchant,editMerchantDetails)
router.post('/bookingStatus',authenticateMerchant,changeStatus)
// router.patch('/addbuissness',authenticateMerchant,buissnessRegister)
// router.get('/get',authenticateMerchant,getBuisnessById)

module.exports = router;
