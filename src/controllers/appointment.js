const Paymob = require('../services/Paymob');
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Promo = require('../models/Promo');
const Zoom = require('../services/Zoom');

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
      .sort((a, b) => b.date.getTime() - a.date.getTime());

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

  const create = async (req, res) => {
    try {
      const { intentionId } = req.body;
      console.log(intentionId);

      const result = await Paymob.getIntention(intentionId);
      const data = result.extras.creation_extras;
      let link = null;

      if (data.type === 'online') {
        const zoom = await Zoom.createMeeting();
        link = zoom.start_url;
      }

      const appointment = new Appointment({
        ...data,
        link,
      });
      appointment.save();
      res.sends(200, appointment);
    } catch (error) {
      console.log(error);
      res.sends(500, error);
    }
  };

  const calcPayment = async (req, res) => {
    let appointmentPrice = 30000;
    const { promoCode } = req.body;
    const promo = await Promo.findOne({ code: promoCode });
    if (promo) {
      const { amount, type, validUntil } = promo;
      if (new Date() > validUntil) {
        res.sends(200, {
          price: appointmentPrice,
        });
      } else {
        if (type === 'flat') appointmentPrice -= amount;
        if (type === 'percent') {
          appointmentPrice = (appointmentPrice * amount) / 100;
        }
      }
    }
    res.sends(200, {
      price: appointmentPrice,
    });
  };

  const reserve = async (req, res) => {
    let appointmentPrice = process.env.PRICE || 30000;
    const { userPhoneNumber, promoCode } = req.body;
    if (!userPhoneNumber) {
      res.sends(422, 'No phone number specified');
      return;
    }
    if (!/^[0-9]{11}$/.test(userPhoneNumber)) {
      res.sends(422, 'not a valid phone number');
      return;
    }

    if (promoCode) {
      const promo = await Promo.findOne({ code: promoCode });
      if (promo) {
        const { amount, type, validUntil } = promo;
        if (new Date() > validUntil) {
          res.sends(400, 'this promo code expired');
        } else {
          if (type === 'flat') appointmentPrice -= amount;
          if (type === 'percent') {
            appointmentPrice = (appointmentPrice * amount) / 100;
          }
        }
      } else {
        res.sends(400, 'promo code not valid');
      }
    }
    try {
      const patient = await User.findById(req.params.patient);
      if (patient) {
        const result = await Paymob.createIntention(
          {
            ...patient._doc,
            phone_number: userPhoneNumber,
          },
          appointmentPrice,
          req.body
        );

        console.log(result);

        res.sends(200, result);
      } else {
        res.sends(404, 'patient not found');
      }
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
    calcPayment,
    create,
  };
})();

module.exports = AppointmentController;
