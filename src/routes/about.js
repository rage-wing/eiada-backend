const about = require('../controllers/about');
const express = require('express');
const router = express.Router();

router.get('/', about.get);
router.post('/', about.update);

module.exports = router;
