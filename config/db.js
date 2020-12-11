const mongoose = require('mongoose');

// Config.env to ./config/config.env
require('dotenv').config({
    path: './config/config.env'
});

const connectDB = async () => {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    console.log(`MongoDB connected: ${connection.connection.host}`);
}
module.exports = connectDB;