const express = require('express');
const appointment = require('../../controllers/appointment');

const router = express.Router();

router.get('/:uid', appointment.getAll);
router.post('/reserve', appointment.reserve);
router.post('/generate-payment-token', appointment.generatePaymentToken);

module.exports = router;
