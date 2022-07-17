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

    console.log();

    try {
      const paymob = new Paymob();
      // const intention = await paymob.createIntention({
      //   amount: '300',
      //   billing_data: {
      //     email: appointment.patient.email,
      //     first_name: appointment.patient.displayName.split(' ')[0],
      //     last_name: appointment.patient.displayName.split(' ')[1],
      //   },
      //   customer: {
      //     first_name: appointment.patient.displayName.split(' ')[0],
      //     last_name: appointment.patient.displayName.split(' ')[1],
      //     email: appointment.patient.email,
      //   },
      // });

      const result = await paymob.pay(appointment.patient);

      res.sends(200, result);
    } catch (error) {
      console.log(error.response.data || error);
    }
  };

  return {
    getAll,
    reserve,
  };
})();

module.exports = AppointmentController;
