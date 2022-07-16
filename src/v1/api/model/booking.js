
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookingAppointmentSchema = new Schema({
    date: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    isCompleted: {
        type: Boolean,
        defalut: false
    },
    amount: {
        type: Number,
    },
    merchantId: {
        type: String,
        required: true
    },
    businessId: {
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