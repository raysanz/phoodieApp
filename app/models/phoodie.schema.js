const mongoose = require('mongoose')
const Schema = mongoose.Schema

const phoodieSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String
    },
    imgUrl: {
        type: String
    }


})

module.exports = mongoose.model('Phoodie', phoodieSchema)