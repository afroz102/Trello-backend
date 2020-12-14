const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


// Load Card Controller
const {
    createCard,
    updateCardText,
    deleteCard,
    sameListReorder,
    diffListReorder
} = require('../controllers/card.controller');


router.post('/create', auth, createCard);
router.post('/edit', auth, updateCardText);
router.post('/delete', auth, deleteCard);
router.post('/reorder/samecolumn', auth, sameListReorder);
router.post('/reorder/differentcolumn', auth, diffListReorder);

module.exports = router;