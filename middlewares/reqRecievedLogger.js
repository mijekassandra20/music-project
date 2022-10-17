const reqRecievedLogger = (req,  res, next) => {
    if(req) {
        console.log('Received request from client!')
    }
    next();
}

module.exports = reqRecievedLogger