// import express
const express = require('express');

// assign a variable called router and instantiate the express router
const router = express.Router();

const {
    getSongs,
    postSong,
    deleteSongs,
    getSong,
    updateSong,
    deleteSong,
    getSongRatings,
    postSongRating,
    deleteSongRatings

} = require('../controllers/songController')

const reqRecievedLogger = require('../middlewares/reqRecievedLogger');

const { songValidator } = require('../middlewares/utils/validators')

router.route('/')
    .get(reqRecievedLogger, getSongs)
    .post(reqRecievedLogger, songValidator, postSong)
    .delete(reqRecievedLogger, deleteSongs)

router.route('/:songId')
    .get(reqRecievedLogger, getSong)
    .put(reqRecievedLogger, updateSong)
    .delete(reqRecievedLogger, deleteSong)

router.route('/:songId/ratings')
    .get(reqRecievedLogger, getSongRatings)
    .post(reqRecievedLogger, postSongRating)
    .delete(reqRecievedLogger, deleteSongRatings)


module.exports = router;
