const express = require('express');
const appointment = require('../../controllers/appointment');

const router = express.Router();

router.get('/:uid', appointment.getAll);
router.post('/reserve', appointment.reserve);

module.exports = router;
