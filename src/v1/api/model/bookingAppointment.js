
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookingAppointment = new Schema({
    day: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    merchantId: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    }
})

const dataModel = mongoose.model('bookingAppointment', bookingAppointmentSchema)
module.exports = datamodel