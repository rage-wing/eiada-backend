const express = require('express');
const userRoutes = require('./user');

const router = express.Router();

router.get('/', (_req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/user', userRoutes);

module.exports = router;
