const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const { ACCESS_TOKEN } = process.env;

const UserController = (() => {
  const get = (req, res) => {
    res.sends(200, req.params.id);
  };
  const auth = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    try {
      const username = jwt.verify(token, ACCESS_TOKEN);
      const user = await User.findOne({ username });

      // hide the password
      delete user._doc.password;
      res.sends(200, { user });
    } catch (error) {
      res.sends(403);
    }
  };
  const login = async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
      const pass = await bcrypt.compare(password, user.password);

      if (pass) {
        const token = jwt.sign(username, ACCESS_TOKEN);
        user._doc.token = token;

        // hide the password
        delete user._doc.password;
        res.sends(200, { user });
      } else {
        throw new Error();
      }
    } catch (error) {
      res.sends(403, 'username or password are wrong');
    }
  };
  const signup = async (req, res) => {
    const { name, username, email } = req.body;
    let { password } = req.body;
    password = password ? await bcrypt.hash(password, 10) : null;
    const newUser = new User({ name, username, password, email });

    try {
      const user = await newUser.save();
      const token = jwt.sign(username, ACCESS_TOKEN);
      user._doc.token = token;

      // hide the password
      delete newUser._doc.password;
      res.sends(200, { user });
    } catch (error) {
      res.sends(409, error.message);
    }
  };
  const edit = (req, res) => {};
  const remove = (req, res) => {};

  return {
    get,
    auth,
    login,
    signup,
    edit,
    remove,
  };
})();

module.exports = UserController;
