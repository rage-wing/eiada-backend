const { default: axios } = require('axios');
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
    const appointment = await Appointment.find({ _id: appointmentId }).populate(
      populateAppointmentMap
    );

    try {
      const result = await axios.post(
        'https://flashapi.paymob.com/v1/intention/',
        {
          amount: '300',
          currency: 'EGP',
          payment_methods: ['card', 'kiosk', 'card-installment'],
          billing_data: {
            apartment: '803',
            email: 'claudette09@exa.com',
            floor: '42',
            first_name: 'Clifford',
            street: 'Ethan Land',
            building: '8028',
            phone_number: '+201010101010',
            shipping_method: 'PKG',
            postal_code: '01898',
            city: 'Jaskolskiburgh',
            country: 'CR',
            last_name: 'Nicolas',
            state: 'Utah',
          },
          customer: {
            first_name: 'test',
            last_name: 'test',
            email: 'claudette09@exa.com',
          },
          items: [
            {
              name: 'ASC1515',
              amount: '150',
              description: 'Smart Watch',
              quantity: '1',
            },
            {
              name: 'ERT6565',
              amount: '150',
              description: 'Power Bank',
              quantity: '1',
            },
          ],
          extras: { some_field: 'some_value' },
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization:
              'Token sk_test_a535f30fb1694b41f247b998c868f95fe5f392ed29ba1a9955092a82370ccce7',
            'Content-Type': 'application/json',
          },
        }
      );
      res.json(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getAll,
    reserve,
  };
})();

module.exports = AppointmentController;
