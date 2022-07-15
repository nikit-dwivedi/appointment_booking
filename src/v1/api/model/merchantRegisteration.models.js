const mongoose = require('mongoose')
const Schema = mongoose.Schema
const availability = new Schema({
    monday: {
        type: Array,
    },
    tuesday: {
        type: Array,

    },
    wednesday: {
        type: Array,

    },
    thursday: {
        type: Array,

    },
    friday: {
        type: Array,

    },
    staurday: {
        type: Array
    },
    sunday: {
        type: Array,
    }
})

const merchantBuisnessRegister = new Schema({
    merchantId: {
        type: String,
        required: true
    },
    profilePic: {
        type: String
    },
    buisnessPhoto: {
        type: String
    },
    buisnessName: {
        type: String
    },
    designation: {
        type: String,
    },
    avalaibility: [
        availability
    ],
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    basePrice: {
        type: String,
    },
    clientId: {
        type: String,
    },
    buisnessId:{
           type:String
    }
})

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
    buisness:[
       merchantBuisnessRegister
    ],
    buisnessType: {
        type: String,
        // required: true

    },
    buisnessSubtype:{
        type:String
    },
    token: { type: String },
    isLogin: {
        type: Boolean,
        default: false
    }

})
const merchantRegisterModel = mongoose.model('MerchantRegister', merchantRegisterSchema)
module.exports = merchantRegisterModel