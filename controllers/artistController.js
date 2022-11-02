const Artist = require('../models/Artist');
const path = require('path')

// For '/' endpoint:
const getArtists = async (req, res, next) => {

    const filter = {};
    const options = {};


    if(Object.keys(req.query).length){
        // query parameter
        const {
            firstName,
            lastName,
            genre,
            limit,
            sortByGenre

        } = req.query

        if(firstName) filter.firstName = true;
        if(lastName) filter.lastName = true;
        if(genre) filter.genre = true;

        if(limit) options.limit = limit
        if(sortByGenre) options.sort = {
            genre: sortByGenre === 'asc' ? 1: -1
        }
    }

    try {
        const artists = await Artist.find({}, filter, options)

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(artists)

    } catch (err) {
        throw new Error(`Error retrieving all artist: ${err.message}`)
    }
    
}

const postArtist = async (req, res, next) => {

    try {
        const artist = await Artist.create(req.body);

    } catch (err) {
        throw new Error(`Error creating a new artist: ${err.message}`)
    }

    res
    .status(201)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: 'Successfully added new artist!'})
}

const deleteArtists = async (req, res, next) => {

    try {
        await Artist.deleteMany();

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: 'Successfully deleted all artists!'})

    } catch (err) {
        throw new Error(`Error deleting all artist: ${err.message}`)
    }
}

// For '/:artistId' endpoint:
const getArtist = async (req, res, next) => {

    try {
        const artist = await Artist.findById(req.params.artistId);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(artist)

    } catch (err) {
        throw new Error(`Error retrieving artist with ID ${req.params.artistId}: ${err.message}`)
    }

}

const updateArtist = async (req, res, next) => {

    try {
        const artist = await Artist.findByIdAndUpdate(req.params.artistId, 
            { $set: req.body}, { new: true})

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(artist)

    } catch (err) {
        throw new Error(`Error updating artist with ID ${req.params.artistId}: ${err.message}`)
    }

}

const deleteArtist = async (req, res, next) => {

    try {
        await Artist.findByIdAndDelete(req.params.artistId);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: `Artist with id: ${req.params.artistId} was successfully deleted!`})

    } catch (err) {
        throw new Error(`Error deleting a user with ID ${req.params.artistId}: ${err.message}`)
    }
    
}

const postArtistImage = async(req, res, next) => {
    // check if req has a key called files
    if(!req.files) throw new Error('Missing image!')

    // create a new variable called 'file' and assign it to the req.files.file value
    const file = req.files.file

    // check if the file type is a 'image' type
    if (!file.mimetype.startsWith('image')) throw new Error('Please upload an image file type!')

    // check if the file size exceeds the limit that was set at 100000000 or 100000 mega-bytes
    if (file.size > process.env.MAX_FILE_SIZE) throw new Error(`Image exceeds size of ${process.env.MAX_FILE_SIZE}`);

    //file.name = `photo_${path.parse(file.name).ext}`
    file.name = `photo_${file.name}`

    const filePath = process.env.FILE_UPLOAD_PATH + file.name
    
    // moves the file to the filePath variable, the argument async will handle the uploading of the new image to the database.
    file.mv((filePath), async (err) => {
        if (err) throw new Error('Problem uploading photo');

        // upload the new file with the value being the file.name
        await Artist.findByIdAndUpdate(req.params.artistId, { image: file.name})

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, data: file.name})
    })

}

module.exports = {
    getArtists,
    postArtist,
    deleteArtists,
    getArtist,
    updateArtist,
    deleteArtist,
    postArtistImage
}