const express = require('express');
const userRoutes = require('./user');
const imageRoutes = require('./image');
const patientRoutes = require('./patient');
const doctorRoutes = require('./doctor');
const articleRoutes = require('./article');

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

// private
router.use('/patient', patientRoutes);
router.use('/doctor', doctorRoutes);

module.exports = router;
