// import mongoose
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// instanstiate schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: [true, 'Please add a username'],
        maxLength: [10, 'Username can not be more than 10 Characters']
    },
    gender: {
        type: String,
        required: [true,'Please add a gender'],
        enum: [
            'Male',
            'Female'
        ]
    },
    age: {
        type: Number,
        required: [true, 'Please add an age'],
        validate: (age) => {
            return typeof age === 'number'
        }
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        validate: (email) => {
            return validator.isEmail(email);
        }
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        validate: (password) => {
            return validator.isStrongPassword(password);
        }
    },
    firstName: {
        type: String,
        required: true,
        maxLength: [10, 'First name cannot be more than 10 characters']
    },
    lastName: {
        type: String,
        required: true,
        maxLength: [10, 'Last name cannot be more than 10 characters']
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire:{
        type: Date
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

UserSchema.pre('save', function(next) {
    this.userName = this.userName.trim();
    this.firstName = this.firstName.trim();
    this.lastName = this.lastName.trim();

    next();
})

UserSchema.post('save', function() {
    this.gender = this.gender.toUpperCase();

} )

// pre hook that hashes a password before it saves in the database
UserSchema.pre('save', async function(next) {
    // check if the password is not modified
    if(!this.isModified('password')) next(); //login

    // salt the password
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt) // for resetPassword, create new Password, update Password
})

// retrieve signed JWT token when user logs in OR create new acc
UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign(
        {id: this._id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRE}
        )
}

// checks the passwords sent by user and match it from database
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// token for resetting password
UserSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString('hex') //generate random byte by 20 and convert to hex

    // hash the resetToken to increase security
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex') 
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000 // set expiration to 1 hr

    return resetToken;

}


module.exports = mongoose.model('User', UserSchema);
