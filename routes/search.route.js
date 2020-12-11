const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


// Load search Controller
const { searchCard, getSearchedCard } = require('../controllers/search.controller');


router.post('/', auth, searchCard);
router.get('/task/:searchQuery', getSearchedCard);

module.exports = router;