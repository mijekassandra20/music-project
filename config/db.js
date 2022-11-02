const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    console.log(`MongDB Connected! ${conn.connection.host}`)
}

module.exports = connectDB;