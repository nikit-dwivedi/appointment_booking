const mongoose = require('mongoose');
const Schema = mongoose.Schema


const transactionSchema = new Schema({
    clientId: {
        type: String
    },
    merchantId: {
        type: String
    },
    amount: {
        type: Number
    },
    type:{
        type:String,
        enum:["booking","refund","payout","failed"]
    }
})