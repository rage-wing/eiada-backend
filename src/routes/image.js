const express = require('express');
const image = require('../controllers/image');
const { upload } = require('../services/Storage');

const router = express.Router();

router.get('/', image.getAll);
router.post('/upload', upload.single('image'), image.imageUpload);

module.exports = router;
