const User = require('../models/User');
const jwt = require('jsonwebtoken');

const protectedRoute = async (req, res, next) => {
    let token;

    // check if req.headers has a key called "authorization", authorization value starts with Bearer
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // check if the token does not exist
    if(!token) throw new Error('Not authorized to access this route!');

    try {
        // verify if the token is real and matches the user
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // fetch for the user using findbyId, and add a user object to the req object
        req.user = await User.findById(decoded.id)

        next();

    } catch (err) {
        throw new Error('Not authorized to access this route')
    }
}

module.exports = protectedRoute