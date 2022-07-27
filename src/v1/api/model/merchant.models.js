const mongoose = require('mongoose')
const Schema = mongoose.Schema
const availability = new Schema({
    Mon: {
        type: Array,
    },
    Tue: {
        type: Array,

    },
    Wed: {
        type: Array,

    },
    Thus: {
        type: Array,

    },
    Fri: {
        type: Array,

    },
    Sat: {
        type: Array
    },
    Sun: {
        type: Array,
    }
})


const merchantRegisterSchema = new Schema({
    merchantId: { type: String, },
    firstName: { type: String, },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    mobileNum: { type: String },
    merchantPhoto: { type: String },
    availability: { type: availability },
    gender: { type: String, enum: ["male", "female", "other"] },
    description: { type: String },
    location: { type: String },
    basePrice: { type: String },
    merchantType: { type: String },
    merchantSubType: { type: String },
    isLogin: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
})
const merchantRegisterModel = mongoose.model('Merchant', merchantRegisterSchema)
module.exports = merchantRegisterModel