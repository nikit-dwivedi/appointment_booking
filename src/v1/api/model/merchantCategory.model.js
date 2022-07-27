const mongoose = require('mongoose')
const Schema = mongoose.Schema

const merchantTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    description: {
        type: String
    }
})

const dataModel = mongoose.model('merchantType', merchantTypeSchema)
module.exports = dataModel