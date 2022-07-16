
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

const merchantBuisnessModel = mongoose.model('merchantBuisnessRegisteration', merchantBuisnessRegister)
module.exports = merchantBuisnessModel