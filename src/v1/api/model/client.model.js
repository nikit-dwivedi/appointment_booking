const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientRegistraionSchema = new Schema({
    clientId: {
        type: String,
        unique: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    mobileNumber: {
        type: Number,
        unique: true
    },
    password: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    dob: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isLogin: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

const userModel = mongoose.model('clientRegistration', clientRegistraionSchema)
module.exports = userModel