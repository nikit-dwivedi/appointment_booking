const Mongoose = require('mongose')
const Schema = mongoose.Schema

const merchantRegisterSchema = new Schema({
    merchantId:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    mobileNum:{
        type:Number,
        required:true
    },
    merchantType:{
        type:String,
        enum:["Parapsychologist","Therapists","Terro-Card"],                                                                       
            required:true
        
    }
})
const merchantRegisterModel = mongoose.model('MerchantRegister',merchantRegisterSchema)
module.exports = merchantRegisterModel