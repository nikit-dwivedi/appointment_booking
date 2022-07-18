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
    profilePic: {
             type: String
             },
    buisnessPhoto: {
        type: String
    },
    avalaibility: 
       {type: availability}
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
    buisnessType: {
        type: String,
        // required: true

    },
    buisnessSubtype:{
        type:String
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
        //  required: true
    },
    lastName: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        //  required: true
    },
    password: {
        type: String,
        //  required: true
    },
    mobileNum: {
        type: String,
        //  required: true
    },
    buisness:
       {type:merchantBuisnessRegister}
    ,
    isLogin: {
        type: Boolean,
        default: false
    }

})
const merchantRegisterModel = mongoose.model('Merchaant', merchantRegisterSchema)
module.exports = merchantRegisterModel