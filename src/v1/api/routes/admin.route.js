const express = require("express");
const router = express.Router();

const { addAdmin, login, getAllMerchant, getMerchantById, addNewCategory } = require('../controller/admin.controller');
const { authenticateAdmin } = require('../middleware/authToken')

router.post('/login', authenticateAdmin, login);
router.post('/register', addAdmin);
router.get('/merchant', getAllMerchant);
router.get('/merchant/:merchantId', getMerchantById);
router.post('/category', addNewCategory);

module.exports = router;
