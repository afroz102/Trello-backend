const mongoose = require('mongoose');

// User Schema
const boardSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Board', boardSchema);