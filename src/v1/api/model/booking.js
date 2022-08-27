
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookingAppointmentSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    showAcceptReject: {
        type: Boolean,
        default: true
    },
    paymentStatus: {
        type: String,
        enum: ["paid", "refunded"],
        default: "paid"
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    amount: {
        type: Number,
    },
    merchantId: {
        type: String,
        required: true
    },
    merchantName: {
        type: String
    },
    merchantNumber: {
        type: String
    },
    merchnatLocation: {
        type: String
    },
    clientId: {
        type: String,
        required: true
    },
    clientName: {
        type: String,
    },
    clientEmail: {
        type: String
    },
    clientNumber: {
        type: String
    }
})

const dataModel = mongoose.model('bookingAppointment', bookingAppointmentSchema)
module.exports = dataModel