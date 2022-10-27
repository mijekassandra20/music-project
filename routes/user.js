// import express
const express = require('express');

// assign a variable called router and instantiate the express router
const router = express.Router();

const {
    getUsers,
    postUser,
    deleteUsers,
    getUser,
    updateUser,
    deleteUser, 
    login

} = require('../controllers/userController')
const reqRecievedLogger = require('../middlewares/reqRecievedLogger');
const protectedRoute = require('../middlewares/auth')

const { 
    userValidator,
    adminValidator
} = require('../middlewares/utils/validators')

router.route('/')
    .get(reqRecievedLogger, adminValidator, getUsers)
    .post(reqRecievedLogger, userValidator, postUser)
    .delete(reqRecievedLogger, protectedRoute, deleteUsers)

router.route('/login')
    .post(reqRecievedLogger, login)

router.route('/:userId')
    .get(reqRecievedLogger, getUser)
    .put(reqRecievedLogger, protectedRoute, updateUser)
    .delete(reqRecievedLogger, protectedRoute, deleteUser)

module.exports = router;
