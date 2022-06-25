const express = require('express');
const User = require('../controllers/user');

const router = express.Router();

router.post('/send-otp', User.sendOtp);
router.get('/signup', User.signup);
router.get('/login', User.login);

module.exports = router;
