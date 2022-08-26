const express = require('express');
const offer = require('../controllers/offer');
const { initStorage } = require('../services/Storage');
const multer = require('multer');

const router = express.Router();

const storage = initStorage('offers');
const upload = multer({ storage });

router.get('/', offer.getAll);
router.post('/', upload.single('thumbnail'), offer.create);

module.exports = router;
