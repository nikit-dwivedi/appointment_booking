const express = require("express");
const router = express.Router();


const { registerClient, clientLogin, getClientById, editClientInfo, bookAppointment, bookingDetails, allBoooking, getAllMerchantByCategory, homeScreen } = require('../controller/client.controller.js');
const { authenticateUser } = require("../middleware/authToken.js");

router.post('/register', registerClient);
router.post('/login', clientLogin);
router.get('/', authenticateUser, getClientById);
router.post('/update', authenticateUser, editClientInfo);
router.post('/booking', authenticateUser, bookAppointment);
router.get('/booking', authenticateUser, allBoooking);
router.get('/booking/:bookingId', authenticateUser, bookingDetails);
router.get('/home', homeScreen);
router.get('/service/:category', getAllMerchantByCategory)


module.exports = router;

