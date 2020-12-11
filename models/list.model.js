const mongoose = require('mongoose');

// User Schema
const listSchema = new mongoose.Schema({
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    },
    title: {
        type: String,
        required: true
    },
    cards: { type: Array },
}, {
    timestamps: true
});

module.exports = mongoose.model('List', listSchema);