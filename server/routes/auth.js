const express = require('express');
const { register, login, getMe, addToFavorites, removeFromFavorites } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { validateRegister, validateLogin } = require('../middleware/validation');

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/me', protect, getMe);
router.post('/favorites', protect, addToFavorites);
router.delete('/favorites', protect, removeFromFavorites);

module.exports = router;