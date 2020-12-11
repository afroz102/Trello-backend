const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Load List Controller
const {
    createList,
    editListTitle,
    deleteList,
} = require('../controllers/list.controller');


router.post('/create', auth, createList);
router.post('/edit', auth, editListTitle);
router.post('/delete', auth, deleteList);

module.exports = router;