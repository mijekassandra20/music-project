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
    login,
    forgotPassword,
    resetPassword,
    updatePassword,
    logout

} = require('../controllers/userController')
const reqRecievedLogger = require('../middlewares/reqRecievedLogger');
const protectedRoute = require('../middlewares/auth')

const { 
    userValidator,
    adminValidator
} = require('../middlewares/utils/validators')

router.route('/')
    .get(reqRecievedLogger, protectedRoute, adminValidator, getUsers)
    .post(reqRecievedLogger, userValidator, postUser)
    .delete(reqRecievedLogger, protectedRoute, deleteUsers)

router.route('/login')
    .post(reqRecievedLogger, login)

router.route('/forgotpassword')
    .post(reqRecievedLogger, forgotPassword)

router.route('/resetpassword')
    .put(reqRecievedLogger, resetPassword)

router.route('/updatepassword')
    .put(reqRecievedLogger, protectedRoute, updatePassword )

router.route('/logout')
    .get(reqRecievedLogger, protectedRoute, logout)

router.route('/:userId')
    .get(reqRecievedLogger, getUser)
    .put(reqRecievedLogger, protectedRoute, updateUser)
    .delete(reqRecievedLogger, protectedRoute, deleteUser)

module.exports = router;
