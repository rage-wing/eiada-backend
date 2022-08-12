const axios = require('axios');
const Paymob = require('../services/Paymob');
const Appointment = require('../models/Appointment');
const User = require('../models/User');

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
    const appointment = new Appointment(req.body);
    await appointment.save();
    const paymentToken = await pay(appointment.id);
    res.sends(200, {
      ...appointment._doc,
      paymentToken,
    });
  };

  const generatePaymentToken = async (req, res) => {
    const patient = await User.findById(req.body.patient);
    console.log(req.body.patient);
    try {
      const token = await Paymob.pay(patient);
      res.sends(200, token);
    } catch (error) {
      console.log(error);
      res.sends(500, '', error);
    }
  };

  return {
    getAll,
    reserve,
    generatePaymentToken,
  };
})();

module.exports = AppointmentController;
