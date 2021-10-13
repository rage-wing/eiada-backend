const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Mailer = require('services/mailer');
const User = require('../models/user');

const { ACCESS_TOKEN } = process.env;

const UserController = (() => {
  const hidePassword = (user) => {
    delete user._doc.password;
    return user;
  };

  const get = async (req, res) => {
    const { username } = req.params;
    try {
      let user = await User.findOne({ username });
      user = hidePassword(user);
      res.sends(200, user);
    } catch (error) {
      res.sends(404, error);
    }
  };
  const auth = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    try {
      const username = jwt.verify(token, ACCESS_TOKEN);
      let user = await User.findOne({ username });
      user = hidePassword(user);
      res.sends(200, { user });
    } catch (error) {
      res.sends(403);
    }
  };
  const login = async (req, res) => {
    const { username, password } = req.body;

    try {
      let user = await User.findOne({ username });
      const pass = await bcrypt.compare(password, user.password);

      if (pass) {
        const token = jwt.sign(username, ACCESS_TOKEN);
        user._doc.token = token;
        user = hidePassword(user);
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
      let user = await newUser.save();
      const token = jwt.sign(username, ACCESS_TOKEN);
      user._doc.token = token;
      user = hidePassword(user);
      res.sends(200, { user });
    } catch (error) {
      res.sends(409, error.message);
    }
  };
  const edit = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const username = jwt.verify(token, ACCESS_TOKEN);
    let user = await User.findOne({ username });
    const { name } = req.body;
    let { password } = req.body;

    // edit available proprties
    if (user) {
      if (name) user.name = name;
      if (password) {
        password = password ? await bcrypt.hash(password, 10) : null;
        user.password = password;
      }
      user = await user.save();
      user = hidePassword(user);
      res.sends(200, user);
    } else {
      res.sends(404, null, 'user');
    }
  };
  const validatePasswordReset = async (req, res) => {
    const { token } = req.params;

    try {
      jwt.verify(token, ACCESS_TOKEN);
      res.send(200);
    } catch (error) {
      res.sends(403);
    }
  };
  const passwordReset = async (req, res) => {
    const { email } = req.body;
    const sent = Mailer.sendPasswordResetEmail(email);
    if (sent) {
      res.sends(200);
    } else {
      res.sends(500, "can't send email");
    }
  };
  const remove = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const username = jwt.verify(token, ACCESS_TOKEN);
    let user = await User.findOneAndRemove({ username });
    if (user) {
      user = hidePassword(user);
      res.sends(200, user);
    } else {
      res.sends(404, null, 'user');
    }
  };

  return {
    get,
    auth,
    login,
    signup,
    edit,
    remove,
    passwordReset,
    validatePasswordReset,
  };
})();

module.exports = UserController;
