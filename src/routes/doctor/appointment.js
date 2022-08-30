const express = require('express');
const appointment = require('../../controllers/doctor/appointment');

const router = express.Router();

router.get('/', appointment.getAll);
router.get('/upcoming', appointment.getUpcoming);
router.get('/pending', appointment.getPending);

module.exports = router;
