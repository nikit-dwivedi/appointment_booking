const express = require("express");
const router = express.Router();


const{merchantRegistration,login,logout, getUserById, editRegister, getAllMerchant,buissnessRegister, getBuisnessById}=require('../controller/merchant.controller');
const { authenticateMerchant,} = require("../middleware/authToken");
const{validateRegister} = require('../validation/merchantRegistration.validation')


router.get('/',authenticateMerchant,getUserById)
router.post('/add',validateRegister('Register'),merchantRegistration)
router.post('/login',login)
router.get('/logout',authenticateMerchant,logout)
router.get('/all',getAllMerchant)
router.patch('/update',authenticateMerchant,editRegister)
// router.patch('/addbuissness',authenticateMerchant,buissnessRegister)
// router.get('/get',authenticateMerchant,getBuisnessById)

module.exports = router;
