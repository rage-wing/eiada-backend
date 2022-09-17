const express = require('express');
const appointment = require('../../controllers/doctor/appointment');

const router = express.Router();

router.get('/', appointment.getAll);
router.get('/upcoming', appointment.getUpcoming);
router.get('/pending', appointment.getPending);
router.post('/accept/:id', appointment.accept);
router.post('/reject/:id', appointment.reject);

module.exports = router;
