// import dependecies packages
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const logger = require('./middlewares/logger');
const artist = require('./routes/artist')
const user = require('./routes/user')
const song = require('./routes/song');
const errorHandler = require('./middlewares/error');

// To read our config values
dotenv.config({path: './config/config.env'})

//initialize our express framework
const app = express();

// use the morgan logger for development purposes ONLY
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// read/parse json data
app.use(bodyParser.json())

// use our logger
app.use(logger);

// handles error
app.use(errorHandler);

// hook up your routes
app.use('/api/v1/artist', artist)
app.use('/api/v1/user', user)
app.use('/api/v1/song', song)

// assigning variable called PORT
const PORT = process.env.PORT || 5001;

// initializing app by using app.listen() method to listen to the PORT
app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`)
})

// add handler to handle unhandled rejection

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`)
    // kill our server
    server.close(() => process.exit(1))
})
