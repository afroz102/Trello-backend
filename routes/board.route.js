const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


// Load Board Controller
const {
    getBoard,
    getBoardById,
    createBoard,
} = require('../controllers/board.controller');



router.get('/', auth, getBoard);
router.post('/createboard', auth, createBoard);
router.get('/:boardId', auth, getBoardById);

module.exports = router;