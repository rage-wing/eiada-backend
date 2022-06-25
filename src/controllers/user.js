const firebase = require('../services/firebase');

const UserController = (() => {
  const login = (req, res) => {
    res.sends(200);
  };
  const signup = (req, res) => {
    res.sends(200);
  };

  return {
    login,
    signup,
  };
})();

module.exports = UserController;
