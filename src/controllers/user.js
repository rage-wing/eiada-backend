const User = require('../models/User');

const UserController = (() => {
  const login = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email }).populate('doctor');

    console.log(user);

    if (!user) {
      const newUser = new User(req.body);
      newUser.save();
      res.sends(200, newUser);
    } else {
      res.sends(200, user);
    }
  };

  return {
    login,
  };
})();

module.exports = UserController;
