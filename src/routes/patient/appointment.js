const express = require('express');
const appointment = require('../../controllers/appointment');

const router = express.Router();

router.get('/:uid', appointment.getAll);
router.get('/:uid/upcoming', appointment.getUpcoming);
router.get('/:uid/history', appointment.getHistory);

router.post('/:patient/reserve', appointment.reserve);
router.post('/generate-payment-token', appointment.generatePaymentToken);
router.post('/create', appointment.create);

module.exports = router;
