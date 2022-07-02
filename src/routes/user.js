const express = require('express');
const User = require('../controllers/user');

const router = express.Router();

router.post('/login', User.login);

module.exports = router;
