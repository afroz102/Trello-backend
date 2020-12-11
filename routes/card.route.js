const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


// Load Card Controller
const {
    createCard,
    updateCardText,
    deleteCard,
} = require('../controllers/card.controller');


router.post('/create', auth, createCard);
router.post('/edit', auth, updateCardText);
router.post('/delete', auth, deleteCard);

module.exports = router;