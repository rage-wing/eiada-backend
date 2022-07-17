const axios = require('axios');

class Paymob {
  constructor(key) {
    this.secretkey = key || process.env.PAYMOB_SECRET_KEY;
    this.apikey = process.env.PAYMOB_API_KEY;
    this.baseUrl = 'https://flashapi.paymob.com/v1/';
    this.config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Token ${this.secretkey}`,
        'Content-Type': 'application/json',
      },
    };
    this.defaultBillingData = {
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
  }

  async createIntention(data) {
    const res = await axios.post(
      `${this.baseUrl}intention/`,
      {
        ...data,
        payment_methods: ['card'],
        billing_data: {
          ...this.defaultBillingData,
          ...data.billing_data,
        },
        currency: 'EGP',
      },
      this.config
    );
    return res.data;
  }

  async pay(data) {
    const auth = await axios.post('https://accept.paymob.com/api/auth/tokens', {
      api_key: this.apikey,
    });
    const { token } = auth.data;

    const order = await axios.post(
      'https://accept.paymob.com/api/ecommerce/orders',
      {
        auth_token: token,
        delivery_needed: 'false',
        amount_cents: '100',
        currency: 'EGP',
        items: [],
      }
    );

    const paymentKeys = await axios.post(
      'https://accept.paymob.com/api/acceptance/payment_keys',
      {
        auth_token: token,
        amount_cents: '100',
        currency: 'EGP',
        expiration: 999999,
        order_id: order.data.id,
        billing_data: {
          apartment: '1',
          email: 'Abdelhamied200@gmail.com',
          floor: '2',
          first_name: 'Abdelhamied',
          street: 'Ethan street',
          building: '1',
          phone_number: '01060126809',
          shipping_method: 'PKG',
          postal_code: '41525',
          city: 'ismailia',
          country: 'EG',
          last_name: 'Mostafa',
          state: 'ismailia',
        },
        integration_id: 2364798,
      }
    );

    const paymentToken = paymentKeys.data.token;

    const payment = await axios.post(
      'https://accept.paymob.com/api/acceptance/payments/pay',
      {
        source: {
          identifier: '01060126809',
          subtype: 'WALLET',
        },
        payment_token: paymentToken, // token obtained in step 3
      }
    );

    return {
      ...payment.data,
      paymentToken,
    };
  }
}

module.exports = Paymob;
