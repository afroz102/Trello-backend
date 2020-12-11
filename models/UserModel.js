const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);