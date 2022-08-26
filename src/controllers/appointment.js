const Paymob = require('../services/Paymob');
const Appointment = require('../models/Appointment');
const User = require('../models/User');

const AppointmentController = (() => {
  const getAllAppointments = async (role, uid) => {
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
    const appointments = await Appointment.find({ [role]: uid }).populate(
      populateAppointmentMap
    );

    return appointments;
  };

  const getAll = async (req, res) => {
    const userId = req.params.uid;
    const appointments = await getAllAppointments('patient', userId);
    res.sends(200, appointments);
  };

  const getUpcoming = async (req, res) => {
    const userId = req.params.uid;
    const appointments = await getAllAppointments('patient', userId);
    const upcoming = appointments
      .filter(
        (appointment) => appointment.date.getTime() >= new Date().getTime()
      )
      .sort((a, b) => a.date.getTime() - b.date.getTime());
    res.sends(200, upcoming);
  };

  const getHistory = async (req, res) => {
    const userId = req.params.uid;
    const appointments = await getAllAppointments('patient', userId);
    const history = appointments
      .filter(
        (appointment) => appointment.date.getTime() < new Date().getTime()
      )
      .sort((a, b) => b.date.getTime() - a.date.getTime());
    res.sends(200, history);
  };

  const reserve = async (req, res) => {
    try {
      const patient = await User.findById(req.params.patient);
      const result = await Paymob.createIntention(patient, 300);
      res.sends(200, result);
    } catch (error) {
      console.log(error);
    }
  };

  const generatePaymentToken = async (req, res) => {
    const patient = await User.findById(req.body.patient);
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
    getUpcoming,
    getHistory,
  };
})();

module.exports = AppointmentController;
