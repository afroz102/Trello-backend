const mongoose = require('mongoose');

// Config.env to ./config/config.env
require('dotenv').config();
// require('dotenv').config({
//     path: './config/config.env'
// });
const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://sahil:CUK5jee8thyJuz19@employee-manager-6udut.mongodb.net/trelloboard?retryWrites=true&w=majority';
const connectDB = async () => {
    const connection = await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    console.log(`MongoDB connected: ${connection.connection.host}`);
}
module.exports = connectDB;