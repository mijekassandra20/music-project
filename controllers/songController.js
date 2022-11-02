const Song = require("../models/Song");

// ------------------ For '/' endpoint: ------------------
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
        .json({ success: true, msg: 'Successfully deleted all songs!'})

    } catch (err){
        throw new Error(`Error deleting all song ${err.message}`)
    }
}

// ------------------ For '/:songId' endpoint: ------------------
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
        .json({ success: true, msg: `Song with ID: ${req.params.songId} was successfully deleted! `})

    } catch (err) {
        throw new Error(`Error deleting song with ID: ${req.params.songId}: ${err.message}`)
    }
    
}

// ------------------ For '/:songId/ratings' endpoint ------------------
const getSongRatings = async (req, res, next) => {
    try {
        const song = await Song.findById(req.params.songId); // Instantiate a variable called 'song' and retrieve the song by using the findById() method.
        const ratings = song.ratings; // access the ratings inside the songs

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
        throw new Error(`Error creating a song rating ${err.message}`)
    }

}

const deleteSongRatings = async (req, res, next) => {
    try {
        const song = await Song.findById(req.params.songId) // Instantiate a variable called 'song' and retrieve the song by using the findById() method.

        song.ratings = []; // Delete all ratings by re-assigning the ratings array as a empty object

        await song.save(); // save the new song

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: 'Successfully deleted all ratings!'})

    } catch (err) {
        throw new Error(`Error deleting all ratings ${err.message}`)
    }

}

// ------------------ For '/:songId/ratings/:ratingId' endpoint ------------------ 

const getSongRating = async (req, res, next) => {
    try {
        const song = await Song.findById(req.params.songId); // instantiate a variable called song

        // find specific rating using find() to see if a rating exists with the req.params.ratingId
        let rating = song.ratings.find(rating => (rating._id).equals(req.params.ratingId)) 

        if (!rating) rating = { success: false, msg: `No rating found with rating ID: ${req.params.ratingId}`}

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(rating)        

    } catch (err) {
        throw new Error(`No rating found with rating ID: ${req.params.ratingId}`)
    }
}

const updateSongRating = async (req, res, next) => {
    try {
        const song = await Song.findById(req.params.songId); // instantiate a variable called song

        // find specific rating using find() to see if a rating exists and compare it with the req.params.ratingId
        let rating = song.ratings.find(rating => (rating._id).equals(req.params.ratingId))

        // if rating was found
        if (rating) {
            const ratingIndexPosition = song.ratings.indexOf(rating); //find the position of the rating using indexOf()
            song.ratings.splice(ratingIndexPosition, 1, req.body) // index of the id u want to update, number of item to be remove, what you want to add
            rating = song.ratings[ratingIndexPosition] // replace the old with the updated
            await song.save() // save
        } else {
            rating = { success: false, msg:`No rating found with rating ID: ${req.params.ratingId}`}
        }

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(rating)

    } catch (err) {
        throw new Error(`Error updating song rating with rating ID: ${req.params.ratingId}`)
    }
}

const deleteSongRating = async (req, res, next) => {
    try {
        const song = await Song.findById(req.params.songId) //instantiate a variable called song and query using find()

        // find specific rating using find() to see if a rating exists and compare it with the req.params.ratingId
        let rating = song.ratings.find(rating => (rating._id).equals(req.params.ratingId)); 

        if(rating){
            const ratingIndexPosition = song.ratings.indexOf(rating); // find the position of the rating using indexOf()
            song.ratings.splice(ratingIndexPosition, 1) // remove the rating using splice() method
            rating = { success: true, msg:`Successfully deleted rating with ID: ${req.params.ratingId}`}
            await song.save(); // save 
        } else {
            rating = { success: false, msg:`No rating found with ID: ${req.params.ratingId}`}
        }

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(rating)
        
    } catch (err) {
        throw new Error(`Error deleting song rating with rating ID: ${req.params.ratingId}`)
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
    deleteSongRatings,
    getSongRating,
    updateSongRating,
    deleteSongRating
}