const express = require("express");
const router = express.Router();

const { addAdmin, login } = require('../controller/admin.controller');
const { authenticateAdmin } = require('../middleware/authtoken')

router.post('/login', authenticateAdmin, login);
router.post('/register', addAdmin)

module.exports = router;
