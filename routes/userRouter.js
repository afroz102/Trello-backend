const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Load User Controller
const {
    login,
    register,
    deleteUser,
    isTokenValid,
    getUserInfo
} = require('../controllers/authController');

router.get("/", auth, getUserInfo);
router.post('/login', login);
router.post('/register', register);
router.delete('/delete', auth, deleteUser);
router.post("/tokenIsValid", isTokenValid);

module.exports = router;