const mongoose = require('mongoose')
const Schema = mongoose.Schema

const merchantRegisterSchema = new Schema({
    merchantId: {
        type: String,
        // required: true
    },
    firstName: {
        type: String,
        // required: true
    },
    lastName: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        // required: true
    },
    mobileNum: {
        type: String,
        // required: true
    },
    merchantType: {
        type: String,
        enum: ["Parapsychologist", "Therapists", "Terro-Card"],
        // required: true

    },
    token: { type: String },
    isLogin: {
        type: Boolean,
        default: false
    }

})
const merchantRegisterModel = mongoose.model('MerchantRegister', merchantRegisterSchema)
module.exports = merchantRegisterModel