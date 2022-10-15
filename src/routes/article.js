const express = require('express');
const article = require('../controllers/article');

const router = express.Router();

router.get('/', article.getAll);
router.post('/', article.create);
router.put('/:id', article.edit);
router.delete('/:id', article.remove);

module.exports = router;
