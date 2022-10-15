const express = require('express');
const about = require('../controllers/about');

const router = express.Router();

router.get('/', about.get);
router.post('/', about.update);

module.exports = router;
