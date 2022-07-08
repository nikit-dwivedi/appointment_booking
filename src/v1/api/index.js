const express = require("express");
const router = express.Router();

require("./config/mongodb");

const userRoute = require("./routes/user.route.js");
const merchantRoute = require("./routes/merchant.route.js");
const adminRoute = require("./routes/admin.route.js");

router.use("/user", userRoute);
router.use("/merchant", merchantRoute);
router.use("/admin", adminRoute);

module.exports = router;