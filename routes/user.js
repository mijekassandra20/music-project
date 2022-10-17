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
    deleteUser

} = require('../controllers/userController')
const reqRecievedLogger = require('../middlewares/reqRecievedLogger');

const { userValidator } = require('../middlewares/utils/validators')

router.route('/')
    .get(reqRecievedLogger, getUsers)
    .post(reqRecievedLogger, userValidator, postUser)
    .delete(reqRecievedLogger, deleteUsers)

router.route('/:userId')
    .get(reqRecievedLogger, getUser)
    .put(reqRecievedLogger, updateUser)
    .delete(reqRecievedLogger, deleteUser)

module.exports = router;
