// validate song before POST
const songValidator = (req, res, next) => {
    if(req.body){
        if (
            !req.body.songTitle || 
            !req.body.artist ||
            !req.body.genre
        ) {
        res
        .status(400)
        .setHeader('Content-Type', 'application/json')
        .json({ success: false, msg: 'Missing Required Fields '})
        } else {
            next();
            }   
        }
    else {
        res.end(`Request for path: ${req.protocol} and method: ${req.method} is missing payload`)
    }
}

// validate artist before POST
const artistValidator = (req, res, next) => {
    if(req.body){
        if (
            !req.body.firstName ||
            !req.body.lastName ||
            !req.body.genre
        ) {
        res
        .status(400)
        .setHeader('Content-Type', 'application/json')
        .json({ success: false, msg: 'Missing Required Fields '})
        } else {
            next();
        }
    }
    else {
        res.end(`Request for path: ${req.protocol} and method: ${req.method} is missing payload`)
    }
}


// validate user before POST
const userValidator = (req, res, next) => {
    if(req.body){
        if (
            !req.body.userName ||
            !req.body.gender ||
            !req.body.age ||
            !req.body.email ||
            !req.body.password ||
            !req.body.firstName ||
            !req.body.lastName
        ) {
        res 
        .status(400)
        .setHeader('Content-Type', 'application/json')
        .json({ success: false, msg: 'Missing Required Fields '})
        } else {
            next();
        }
    }
    else {
        res.end(`Request for path: ${req.protocol} and method: ${req.method} is missing payload`)
    }
}

const adminValidator = (req, res, next) => {

    // check if admin value is true from req.user
    if(req.user.admin) {
        next()
    } else {
        res
        .status(403)
        .setHeader('Content-Type', 'application/json')
        .json({ success: false, msg:"Unauthorized to access this resource"})
    }

}

module.exports = {
    songValidator,
    artistValidator,
    userValidator,
    adminValidator
}