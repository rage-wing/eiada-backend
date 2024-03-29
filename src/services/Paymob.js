const axios = require('axios');

const Paymob = (() => {
  const apiKey = process.env.PAYMOB_API_KEY;
  const secret = process.env.PAYMOB_SECRET_KEY;
  const baseUrl = 'https://accept.paymob.com/api';
  const defaultBillingData = {
    apartment: 'NA',
    floor: 'NA',
    street: 'NA',
    building: 'NA',
    shipping_method: 'NA',
    postal_code: 'NA',
    city: 'NA',
    country: 'NA',
    state: 'NA',
    phone_number: '+20100100100',
  };

  // utils
  const exchangeToken = async () => {
    const auth = await axios.post(`${baseUrl}/auth/tokens`, {
      api_key: apiKey,
    });
    return auth.data.token;
  };
  const createOrder = async (token, price) => {
    const order = await axios.post(`${baseUrl}/ecommerce/orders`, {
      auth_token: token,
      delivery_needed: false,
      items: [],
      amount_cents: price,
    });
    return order.data;
  };
  const createPaymentToken = async (token, orderId, IntegrationId, price, billingData) => {
    const payment = await axios.post(`${baseUrl}/acceptance/payment_keys`, {
      auth_token: token,
      currency: 'EGP',
      expiration: 999999,
      order_id: orderId,
      integration_id: IntegrationId,
      billing_data: {
        ...defaultBillingData,
        ...billingData,
      },
      amount_cents: price,
    });
    return payment.data;
  };

  // public methods
  const pay = async (patient) => {
    const billingData = {
      first_name: patient.displayName.split(' ')[0],
      last_name: patient.displayName.split(' ')[1],
      email: patient.email,
    };
    const token = await exchangeToken();

    const order = await createOrder(token, 3500);
    // CARD : 423021
    // WALLET : 2393641
    const payment = await createPaymentToken(token, order.id, 423021, 3500, billingData);
    return payment.token;
  };

  const createIntention = async (patient, price, extras) => {
    const config = {
      headers: {
        Authorization: `Token ${secret}`,
      },
    };

    const data = {
      amount: price,
      currency: 'EGP',
      payment_methods: ['card'],
      billing_data: {
        ...defaultBillingData,
        first_name: patient.displayName.split(' ')[0],
        last_name: patient.displayName.split(' ')[1],
        email: patient.email,
        phone_number: '+201007733887',
      },
      customer: {
        first_name: patient.displayName.split(' ')[0],
        last_name: patient.displayName.split(' ')[1],
        email: patient.email,
      },
      items: [],
      extras,
    };

    const res = await axios.post('https://flashapi.paymob.com/v1/intention/', data, config);

    return res.data;
  };

  const getIntention = async (id) => {
    const config = {
      headers: {
        Authorization: `Token ${secret}`,
      },
    };

    const res = await axios.get(`https://flashapi.paymob.com/v1/intention/${id}`, config);

    return res.data;
  };

  return {
    pay,
    createIntention,
    getIntention,
  };
})();

module.exports = Paymob;
