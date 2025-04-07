const mongoose = require('mongoose');

const connectdb = async () =>{
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectdb;