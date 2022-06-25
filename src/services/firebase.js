const admin = require('firebase-admin');
const serviceAccount = require('../config/firebase/serviceAccount.key.json');

const firebase = (() => {
  const init = () => {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  };

  return {
    init,
  };
})();

module.exports = firebase;
