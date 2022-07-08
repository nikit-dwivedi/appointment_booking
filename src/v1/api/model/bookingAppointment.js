
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookingAppointmentSchema = new Schema({
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
    amount:{
        type:Number,
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
module.exports = dataModel