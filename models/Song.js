const mongoose = require('mongoose');
const validator = require('validator')

// Define schema
const Schema = mongoose.Schema;

const RatingSchema = new Schema ({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
        validate: (rating) => {
            return typeof rating === 'number'
        }
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId, // mongoose data type for object ID
        ref: 'User' // Model references 
    }
})

const SongSchema = new Schema ({
    songTitle: {
        type: String,
        unique: true,
        required: [true, 'Please add a song title'],
        maxLength: [20, 'Song name can not be more than 20 characters']
    },
    artist: {
        type: String,
        required: [true, 'Please add an artist']
    },
    genre: {
        type: String,
        required: [true, 'Please add a genre']
    },
    ratings: [RatingSchema]

}, {
    timestamps: true
})

// Compile model from schema, first argument is the name of the collection that will be created, 
// the second argument is the schema you want to use in creating the model
module.exports = mongoose.model('Song', SongSchema);