// For '/' endpoint:
const getUsers = (req, res, next) => {

    //query parameter
    if(Object.keys(req.query).length){
        // de-structure
        const { 
            userName, 
            gender, 
            age 
        } = req.query

        // assign empty array
        const filter = [];

        // check if value exists
        if (userName) filter.push(userName);
        if (gender) filter.push(gender);
        if (age) filter.push(age);

        for (let i = 0; i < filter.length; i++){
            console.log(`Searching user by: ${filter[i]}`)
        }
    }

    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: 'show me all users! '})
}

const postUser = (req, res, next) => {
    res
    .status(201)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: 'add new user '})
}

const deleteUsers = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: 'delete all users!'})
}

// For '/:userId' endpoint:
const getUser = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: `show me user with id: ${req.params.userId} `})
}

const updateUser = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: `update user with id: ${req.params.userId} `})
}

const deleteUser = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: `delete user with id: ${req.params.userId} `})
}

module.exports = {
    getUsers,
    postUser,
    deleteUsers,
    getUser,
    updateUser,
    deleteUser
}