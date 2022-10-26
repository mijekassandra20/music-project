// import express
const express = require('express');

// assign a variable called router and instantiate the express router
const router = express.Router();

const {
    getArtists,
    postArtist,
    deleteArtists,
    getArtist,
    updateArtist,
    deleteArtist,
    postArtistImage

} = require('../controllers/artistController')
const reqRecievedLogger = require('../middlewares/reqRecievedLogger');

const { artistValidator } = require('../middlewares/utils/validators')

router.route('/')
    .get(reqRecievedLogger, getArtists)
    .post(reqRecievedLogger, artistValidator, postArtist)
    .delete(reqRecievedLogger, deleteArtists)

router.route('/:artistId')
    .get(reqRecievedLogger, getArtist)
    .put(reqRecievedLogger, updateArtist)
    .delete(reqRecievedLogger, deleteArtist)

router.route('/:artistId/image')
    .post(reqRecievedLogger, postArtistImage)

module.exports = router;
