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
        .json({ success: true, msg: 'Successfully deleted all users!'})

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
        await User.findByIdAndDelete(req.params.userId);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: `User with id: ${req.params.userId} was successfully deleted!`})

        
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

// For '/forgotpassword' endpoint

const forgotPassword = async (req, res, next) => {
    const user = await User.findOne( {email: req.body.email}) // retrieve the user using email

    if(!user) throw new Error('No user found!') // if no user exist

    const resetToken = user.getResetPasswordToken();

    try {
        await user.save({ validateBeforeSave: false }) // save and skip the pre hook

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
            success: true, 
            msg: `Password has been reset with token: ${resetToken}`
        })

    } catch (err) {
        this.resetPasswordToken = undefined;
        this.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false})

        throw new Error('Failed to save new password!')
    }
}

// For '/resetpassword' endpoint
const resetPassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.query.resetToken).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt:Date.now() } // find a resetPasswordExpire greater than the current time if there is one
    })

    if(!user) throw new Error('Invalid token!')

    user.password = req.body.password; // set the password with the req.body.password
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save()

    sendTokenResponse(user, 200, res)
}

// For '/updatepassword'
const updatePassword = async (req, res, next) => {
    // find a user with that ID and return along with the password
    const user = await User.findById(req.user.id).select('+password') 

    const passwordMatches = await user.matchPassword(req.body.password); //match it with the one in DB

    if(!passwordMatches) throw new Error('Password is incorrect')

    user.password = req.body.newPassword // reassign the password in the db with the req.body.password

    await user.save()

    sendTokenResponse(user, 200, res)
}

// For '/logout' endpoint
const logout = async(req, res, next) => {
    res
    .status(200)
    res.cookie('token','none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })
    .json({sucess: true, msg: 'Successfully logged out!'})
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
    login,
    forgotPassword,
    resetPassword,
    updatePassword,
    logout
}