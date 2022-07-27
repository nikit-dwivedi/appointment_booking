const express = require("express");
const router = express.Router();

const { addAdmin, login, getAllMerchant, getMerchantById, addNewCategory, makeMerchantFeatured, removeMerchantFeatured,addTestimony } = require('../controller/admin.controller');
const { authenticateAdmin } = require('../middleware/authToken')

router.post('/login', authenticateAdmin, login);
router.post('/register', addAdmin);
router.get('/merchant', getAllMerchant);
router.get('/merchant/:merchantId', getMerchantById);
router.post('/category', addNewCategory);
router.post('/featured/add', makeMerchantFeatured);
router.post('/featured/remove', removeMerchantFeatured)
router.post('/testimony', addTestimony);

module.exports = router;
