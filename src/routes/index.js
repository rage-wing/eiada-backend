const express = require('express');
const userRoutes = require('./user');
const patientRoutes = require('./patient');

const router = express.Router();

router.get('/', (_req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

// global
router.use('/user', userRoutes);

// private
router.use('/patient', patientRoutes);

module.exports = router;
