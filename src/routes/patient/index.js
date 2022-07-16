const express = require('express');
const appointmentRoutes = require('./appointment');

const router = express.Router();

router.get('/', (_req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/appointment', appointmentRoutes);

module.exports = router;
