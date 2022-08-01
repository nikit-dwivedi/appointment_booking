const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    adminId: {
        type: String,
        unique: true
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
}, { timestamps: true });

const adminModel = mongoose.model('admin', adminSchema)
module.exports = adminModel