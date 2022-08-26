const express = require('express');
const userRoutes = require('./user');
const imageRoutes = require('./image');
const patientRoutes = require('./patient');
const articleRoutes = require('./article');
const offerRoutes = require('./offer');

const router = express.Router();

router.get('/', (_req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

// global
router.use('/user', userRoutes);
router.use('/image', imageRoutes);
router.use('/article', articleRoutes);
router.use('/offer', offerRoutes);

// private
router.use('/patient', patientRoutes);

module.exports = router;
