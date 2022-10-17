// For '/' endpoint:
const getArtists = (req, res, next) => {

    if(Object.keys(req.query).length){
        // query parameter
        const {
            firstName,
            lastName,
            gender
        } = req.query

        // assign empty array
        const filter = []

        if(firstName) filter.push(firstName);
        if(lastName) filter.push(lastName);
        if(gender) filter.push(gender);

        for (let i = 0; i < filter.length; i++){
            console.log(`Searching artist by: ${filter[i]}`)
        }
    }

    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: 'show me all artists! '})
}

const postArtist = (req, res, next) => {
    res
    .status(201)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: 'add new artist '})
}

const deleteArtists = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: 'delete all artists!'})
}

// For '/:artistId' endpoint:
const getArtist = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: `show me artist with id: ${req.params.artistId} `})
}

const updateArtist = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: `update artist with id: ${req.params.artistId} `})
}

const deleteArtist = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: `delete artist with id: ${req.params.artistId} `})
}

module.exports = {
    getArtists,
    postArtist,
    deleteArtists,
    getArtist,
    updateArtist,
    deleteArtist
}