const mongoose = require('mongoose');

require('dotenv').config();

const  connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Database connected Successfully');
    } catch (error) {
        console.log('Database connection failed: ', error);
    }
}

module.exports = { connectToDb };