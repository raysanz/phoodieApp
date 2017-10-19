const mongoose = require('mongoose')
const Schema = mongoose.Schema

const hackerSchema = new Schema({
    name: {
        type: String,
    }
})

// define our hacker model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Hacker', hackerSchema)