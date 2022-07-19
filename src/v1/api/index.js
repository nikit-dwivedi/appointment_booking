const express = require("express");
router = express.Router();

require("./config/mongodb");

const userRoute = require("./routes/client.route.js");
const merchantRoute = require("./routes/merchant.route.js");
const adminRoute = require("./routes/admin.route.js");
// const buissnessRoute = require('./routes/mrerchantBuissness.route');


router.use("/user", userRoute);
router.use("/merchant", merchantRoute);
router.use("/admin", adminRoute);
// router.use("/buissnessRegister",buissnessRoute)

module.exports = router;