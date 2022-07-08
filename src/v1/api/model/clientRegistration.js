
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientRegistraionSchema = new Schema({
    clientId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    }
})

const userModel = mongoose.model('clientRegistration', clientRegistraionSchema)
module.exports = userModel