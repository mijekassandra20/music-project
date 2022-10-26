// import mongoose
const mongoose = require('mongoose');
const validator = require('validator');

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

module.exports = mongoose.model('User', UserSchema);
