const User = require('../models/User')
const crypto = require('crypto');

// For '/' endpoint:
const getUsers = async (req, res, next) => {

    const filter = {};
    const options = {};

    //query parameter
    if(Object.keys(req.query).length){
        // de-structure
        const { 
            userName, 
            gender, 
            age,
            email,
            password,
            firstName,
            lastName,
            limit,
            sortByAge
        } = req.query

        if(userName) filter.userName = true;
        if(gender) filter.gender = true;
        if(age) filter.age = true;
        if(email) filter.email = true;
        if(password) filter.password = true;
        if(firstName) filter.firstName = true;
        if(lastName) filter.lastName = true;

        if(limit) options.limit = limit;
        if(sortByAge) options.sort = {
            age: sortByAge === 'asc' ? 1 : -1
        }

    }

    try{
        const users = await User.find({}, filter, options);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(users)
        
    } catch (err) {
        throw new Error(`Error retrieving user: ${err.message}`)
    }

}

const postUser = async (req, res, next) => {

    try {
        const user = await User.create(req.body);

        sendTokenResponse(user, 201, res)

    } catch (err) {
        throw new Error(`Error creating new user: ${err.message}`)
    }
    
}

const deleteUsers = async (req, res, next) => {
    
    try {
        await User.deleteMany();

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: 'delete all users!'})

    } catch (err) {
        throw new Error(`Error deleting all users: ${err.message}`)
    }

}

// For '/:userId' endpoint:
const getUser = async (req, res, next) => {

    try {
        const user = await User.findById(req.params.userId);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(user)

    } catch (err) {
        throw new Error(`Error retrieving a user with ID ${req.params.userId}: ${err.message} `)
    }
}

const updateUser = async (req, res, next) => {

    try {
        const user = await User.findByIdAndUpdate(req.params.userId,
            { $set: req.body }, { new: true });

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(user)

    } catch (err) {
        throw new Error(`Error updating user with ID ${req.params.userId}: ${err.message}`)
    }

}

const deleteUser = async (req, res, next) => {

    try {
        await User.findByIdAndDelete(req.param.userId);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: `delete user with id: ${req.params.userId} `})

        
    } catch (err) {
        throw new Error(`Error deleting user with ID ${req.params.userId}: ${err.message}}`)
    }
}

const login = async (req, res, next) => {
    const {email, password} = req.body // de construct the values email and password

    if (!email || !password) throw new Error('Please provide an email and password') // check if the email or password exist

    const user = await User.findOne({email}).select('+password'); // find user by email and return password

    if (!user) throw new Error('Invalid credentials!') // check if there is no user, then throw an error

    // check if password matches in the database
    const isMatch = await user.matchPassword(password);

    if (!isMatch) throw new Error('Invalid credentials!')

    sendTokenResponse(user, 200, res)

}

// function for sendTokenResponse 
const sendTokenResponse = (user, statusCode, res) => {

    // to generate a JWT token
    const token = user.getSignedJwtToken();

    const options = {
        // set expiration for cookie to ~ 2 hrs
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true // security to hide/encrypt payload
    }

    if (process.env.NODE_ENV === 'production') options.secure = true;

    res
    .status(statusCode)
    .cookie('token', token, options)
    .json({success: true, token})
}


module.exports = {
    getUsers,
    postUser,
    deleteUsers,
    getUser,
    updateUser,
    deleteUser,
    login
}