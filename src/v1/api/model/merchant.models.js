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

// const merchantBuisnessRegister = new Schema({
//     profilePic: {
//         type: String
//     },
//     buisnessPhoto: {
//         type: String
//     },
//     availability:
//         { type: availability }
//     ,
//     description: {
//         type: String,
//     },
//     location: {
//         type: String,
//     },
//     basePrice: {
//         type: String,
//     },
//     buisnessType: {
//         type: String,
//     },
//     buisnessSubType: {
//         type: String
//     },
//     buisnessId: {
//         type: String
//     }
// })

const merchantRegisterSchema = new Schema({
    merchantId: {
        type: String,

    },
    firstName: {
        type: String,

    },
    lastName: {
        type: String,

    },
    email: {
        type: String,

    },
    password: {
        type: String,

    },
    mobileNum: {
        type: String,
    },
    merchantPhoto: {
        type: String
    },
    availability:
        { type: availability }
    ,
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    basePrice: {
        type: String,
    },
    merchantType: {
        type: String,
    },
    merchantSubType: {
        type: String
    },
    isLogin: {
        type: Boolean,
        default: false
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    }

})
const merchantRegisterModel = mongoose.model('Merchant', merchantRegisterSchema)
module.exports = merchantRegisterModel