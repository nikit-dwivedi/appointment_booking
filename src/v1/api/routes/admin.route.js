const express = require("express");
const router = express.Router();
const { addAdmin, login, getAllMerchant, getMerchantById, addNewCategory, makeMerchantFeatured, removeMerchantFeatured, addTestimony, getClientList, IndividualClient, bookingList, getMerchantBookingList, getIndividualBooking } = require('../controller/admin.controller');
const { authenticateAdmin } = require('../middleware/authToken')
router.post('/login', login);
router.post('/register', addAdmin);
router.post('/category', authenticateAdmin, addNewCategory);
router.post('/testimony', authenticateAdmin, addTestimony);
//merchant operations
router.get('/merchant', authenticateAdmin, getAllMerchant);
router.get('/merchant/:merchantId', authenticateAdmin, getMerchantById);
router.post('/featured/add', authenticateAdmin, makeMerchantFeatured);
router.post('/featured/remove', authenticateAdmin, removeMerchantFeatured)
// client operations
router.get('/client', authenticateAdmin, getClientList);
router.get('/client/:clientId', authenticateAdmin, IndividualClient);
//booking operations
router.get('/booking', authenticateAdmin, bookingList);
router.get('/booking/:bookingId', authenticateAdmin, getIndividualBooking);
router.post('/booking/merchant', authenticateAdmin, getMerchantBookingList);
module.exports = router;