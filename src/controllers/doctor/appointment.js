const Appointment = require('../../models/Appointment');

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
    const userId = 'process.env.DOCTOR_UID';
    const appointments = await getAllAppointments('doctor', userId);
    res.sends(200, appointments);
  };

  const getUpcoming = async (req, res) => {
    const userId = 'process.env.DOCTOR_UID';
    const appointments = await getAllAppointments('doctor', userId);
    const upcoming = appointments
      .filter((appointment) => ['confirmed'].includes(appointment.status))
      .sort((a, b) => a.date.getTime() - b.date.getTime());
    res.sends(200, upcoming);
  };

  const getPending = async (req, res) => {
    const userId = 'process.env.DOCTOR_UID';
    const appointments = await getAllAppointments('doctor', userId);
    const history = appointments
      .filter(
        (appointment) => ['pending'].includes(appointment.status)
          && appointment.date.getTime() > new Date().getTime()
      )
      .sort((a, b) => b.date.getTime() - a.date.getTime());
    res.sends(200, history);
  };

  const accept = async (req, res) => {
    const appointmentId = req.params.id;
    try {
      const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
        status: 'confirmed',
      });
      res.sends(200, appointment);
    } catch (error) {
      res.sends(400, error.message);
    }
  };

  const reject = async (req, res) => {
    const appointmentId = req.params.id;
    try {
      const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
        status: 'cancelled',
      });
      res.sends(200, appointment);
    } catch (error) {
      res.sends(400, error.message);
    }
  };

  return {
    getAll,
    getUpcoming,
    getPending,
    accept,
    reject,
  };
})();

module.exports = AppointmentController;
