const Song = require("../models/Song");

// For '/' endpoint:
const getSongs = async (req, res, next) => {
    //query parameter

    const filter = {};
    const options = {};

    if (Object.keys(req.query).length){
        // de-structure
        const { 
            songTitle, 
            artist, 
            genre,
            limit,
            sortByArtist

        } = req.query

        // assign empty array
        // check if value exists
        if (songTitle) filter.songTitle = true;
        if (artist) filter.artist = true;
        if (genre) filter.genre = true;

        if(limit) options.limit = limit;
        if(sortByArtist) options.sort = {
            artist: sortByArtist === 'asc' ? 1 : -1
        }
        
    }

    try {
        const songs = await Song.find({}, filter, options);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(songs)

    } catch (err) {
        throw new Error(`Error retrieving songs: ${err.message}`);
    }
 
}

const postSong = async (req, res, next) => {

    try {
        const song = await Song.create(req.body);

    res
    .status(201)
    .setHeader('Content-Type', 'application/json')
    .json(song)

    } catch (err){
        throw new Error(`Error adding new song: ${err.message}`);
    }
}

const deleteSongs = async (req, res, next) => {

    try {
        await Song.deleteMany();

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: 'delete all songs!'})

    } catch (err){
        throw new Error(`Error deleting all song ${err.message}`)
    }
}

// For '/:songId' endpoint:
const getSong = async (req, res, next) => {

    try {
        const song = await Song.findById(req.params.songId);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(song)


    } catch (err){
        throw new Error(`Error retrieving a song with ID: ${req.params.songId}: ${err.message}`)
    }
}

const updateSong = async (req, res, next) => {

    try {
        const song = await Song.findByIdAndUpdate(req.params.songId,
            {$set: req.body}, {new: true});

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(song)

    } catch (err) {
        throw new Error(`Error updating song with ID: ${req.params.songId}: ${err.message}`)
    }
}

const deleteSong = async (req, res, next) => {

    try {
        await Song.findByIdAndDelete(req.params.songId)

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: `delete song with id: ${req.params.songId} `})

    } catch (err) {
        throw new Error(`Error deleting song with ID: ${req.params.songId}: ${err.message}`)
    }
    
}

// For '/:songId/ratings' endpoint
const getSongRatings = async (req, res, next) => {
    try {
        const songs = await Song.findById(req.params.songId); // Instantiate a variable called 'songs' and retrieve the song by using the findById() method.
        const ratings = songs.ratings; // access the ratings inside the songs

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(ratings)

    } catch (err) {
        throw new Error(`Error retrieving all ratings ${err.message}`)
    }
}

const postSongRating = async (req, res, next) => {
    try {
        const song = await Song.findById(req.params.songId);// Instantiate a variable called 'songs' and retrieve the song by using the findById() method.
        song.ratings.push(req.body); // after accessing the rating array, push the new rating in req.body

        const result = await song.save() // assign a new variable called result and save the song

        res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json(result)
        
    } catch (err) {
        throw new Error(`Error creating a rating ${err.message}`)
    }

}

const deleteSongRatings = async (req, res, next) => {
    try {
        const songs = await Song.findById(req.params.songId) // Instantiate a variable called 'songs' and retrieve the song by using the findById() method.

        songs.ratings = []; // Delete all ratings by re-assigning the ratings array as a empty object

        await songs.save(); // save the new song

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: 'All ratings deleted!'})

    } catch (err) {
        throw new Error(`Error deleting all ratings ${err.message}`)
    }

}

// For '/:songId/ratings/ratingId' endpoint

const getSongRating = async (req, res, next) => {
    try {
        
    } catch (err) {
        
    }
}

const updateSongRating = async (req, res, next) => {
    try {
        
    } catch (err) {
        
    }
}

const deleteSongRating = async (req, res, next) => {
    try {
        
    } catch (err) {
        
    }
}



module.exports = {
    getSongs,
    postSong,
    deleteSongs,
    getSong,
    updateSong,
    deleteSong,
    getSongRatings,
    postSongRating,
    deleteSongRatings
}