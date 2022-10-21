const Artist = require('../models/Artist');

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
    .json({ success: true, msg: 'add new artist '})
}

const deleteArtists = async (req, res, next) => {

    try {
        await Artist.deleteMany();

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: 'delete all artists!'})

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
        .json({ success: true, msg: `delete artist with id: ${req.params.artistId} `})

    } catch (err) {
        throw new Error(`Error deleting a user with ID ${req.params.artistId}: ${err.message}`)
    }
    
}

module.exports = {
    getArtists,
    postArtist,
    deleteArtists,
    getArtist,
    updateArtist,
    deleteArtist
}