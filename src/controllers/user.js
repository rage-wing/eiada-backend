const User = require('../models/User');

const UserController = (() => {
  const login = async (req, res) => {
    const { uid } = req.body;
    const user = await User.findOne({ uid }).populate('doctor');

    if (!user) {
      const newUser = new User(req.body);
      await newUser.save();
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
