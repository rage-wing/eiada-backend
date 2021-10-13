const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const Mailer = (() => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const sendPasswordResetEmail = (to) => {
    const { ACCESS_TOKEN } = process.env;
    const token = jwt.sign(to, ACCESS_TOKEN);

    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject: '[MKANK] Password Reset',
      html: `<h1>That was easy!</h1><a href='${token}' />`,
    };
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return error;
      }
      return true;
    });
  };

  return {
    sendPasswordResetEmail,
  };
})();

module.exports = Mailer;
