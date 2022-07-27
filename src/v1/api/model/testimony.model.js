const mongoose = require('mongoose')
const Schema = mongoose.Schema

const testimonySchema = new Schema({
    name: { type: String },
    image: { type: String },
    review: { type: String },
})

const dataModel = mongoose.model('testimony', testimonySchema)
module.exports = dataModel