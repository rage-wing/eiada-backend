const express = require('express');
const multer = require('multer');
const article = require('../controllers/article');
const { initStorage } = require('../services/Storage');

const router = express.Router();

const storage = initStorage('articles');
const upload = multer({ storage });

router.get('/', article.getAll);
router.post('/', upload.single('image'), article.create);

module.exports = router;
