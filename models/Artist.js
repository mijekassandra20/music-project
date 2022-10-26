// import mongoose
const mongoose = require('mongoose');

// instantiate Schema
const Schema = mongoose.Schema;

const ArtistSchema = new Schema ({
    firstName: {
        type: String,
        required: true,
        maxLength: [10, 'First name cannot be more than 10 characters']
    },
    lastName: {
        type: String,
        required: true,
        maxLength: [10, 'Last name cannot be more than 10 characters']
    },
    genre: {
        type: String,
    },
    image: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Artist', ArtistSchema);