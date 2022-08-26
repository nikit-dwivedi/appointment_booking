const mongoose = require('mongoose');
const Schema = mongoose.Schema


const transactionSchema = new Schema({
    clientId: {
        type: String
    },
    merchantId: {
        type: String
    },
    name: {
        type: String
    },
    amount: {
        type: Number
    },
    type: {
        type: String,
        enum: ["booking", "refund", "payout", "failed"]
    },
    paymentId: {
        type: String,
    },
    paymentIntent: {
        type: String
    },
    ephemeralKey: {
        type: String
    }
})
const transactionModel = mongoose.model('transactions', transactionSchema);
module.exports = transactionModel;