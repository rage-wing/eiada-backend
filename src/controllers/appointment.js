const axios = require('axios');
const Paymob = require('../services/Paymob');
const Appointment = require('../models/Appointment');

const AppointmentController = (() => {
  const populateAppointmentMap = [
    {
      path: 'doctor',
      model: 'Doctor',
      populate: {
        path: 'user',
        model: 'User',
      },
    },
    {
      path: 'patient',
      model: 'User',
    },
  ];
  const getAll = async (req, res) => {
    const userId = req.params.uid;
    const appointments = await Appointment.find({ patient: userId }).populate(
      populateAppointmentMap
    );
    res.sends(200, appointments);
  };

  const reserve = async (req, res) => {
    const appointmentId = req.params.id;
    const appointment = await Appointment.findById(appointmentId).populate(
      populateAppointmentMap
    );

    try {
      const result = await Paymob.pay(appointment.patient);
      res.sends(200, result);
    } catch (error) {
      res.json(error.response.data);
    }
  };

  return {
    getAll,
    reserve,
  };
})();

module.exports = AppointmentController;
