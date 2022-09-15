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
    const userId = '62cc29ffeb2fe06ff7211bb0';
    const appointments = await getAllAppointments('doctor', userId);
    res.sends(200, appointments);
  };

  const getUpcoming = async (req, res) => {
    const userId = '62cc29ffeb2fe06ff7211bb0';
    const appointments = await getAllAppointments('doctor', userId);
    const upcoming = appointments
      .filter((appointment) =>
        ['confirmed', 'cancelled'].includes(appointment.status)
      )
      .sort((a, b) => a.date.getTime() - b.date.getTime());
    res.sends(200, upcoming);
  };

  const getPending = async (req, res) => {
    const userId = '62cc29ffeb2fe06ff7211bb0';
    const appointments = await getAllAppointments('doctor', userId);
    const history = appointments
      .filter((appointment) =>
        ['draft', 'pending'].includes(appointment.status)
      )
      .sort((a, b) => b.date.getTime() - a.date.getTime());
    res.sends(200, history);
  };

  const accept = async (req, res) => {
    const { id } = req.body;
    console.log(id);
    Appointment.findByIdAndUpdate(id, {
      status: 'confirmed',
    });

    res.sends(200, 'confirmed');
  };
  const reject = async (req, res) => {
    const { id } = req.body;
    Appointment.findByIdAndUpdate(id, {
      status: 'cancelled',
    });

    res.sends(200, 'cancelled');
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
