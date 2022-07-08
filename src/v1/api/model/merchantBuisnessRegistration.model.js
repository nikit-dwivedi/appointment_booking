
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const availability = new Schema({
    monday:{
        type:Array,
        },
    tuesday:{
        type:Array,
        
    },
    wednesday:{
        type:Array,
        
    },
    thursday:{
        type:Array,
        
    },
    friday:{
        type:Array,

    },
    staurday:{
        type:Array
    },
    sunday:{
        type:Array,
    }
})

const merchantBuisnessRegister =new Schema({
    merchantid:{
        type:String,
        required:true
    },
    profilePic:{
        type:String
    },
    buisnessPhoto:{
        type:Array
    },
    designation:{
        type:String,
        required:true
    },
    avalaibility:[
        availability
    ],
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    basePrice:{
        type:String,
        required:true
    },
    clientId:{
        type:String,
        required:true
    }
})

const merchantBuisnessModel = mongoose.model('merchantBuisnessRegisteration',merchantBuisnessRegister)
module.exports = merchantBuisnessModel