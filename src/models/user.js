const mongoose = require('mongoose');
const unique = require('../utils/unique');

const { Schema } = mongoose;

const User = new Schema({
  name: {
    type: String,
    required: 'name is required',
    trim: true,
  },
  username: {
    type: String,
    required: 'username is required',
    unique: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: 'email is required',
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'not valid email address',
    ],
  },
  password: {
    type: String,
    required: 'password is required',
  },
  joined: {
    type: Date,
    default: Date.now,
  },
});

// handling unique errors
User.post('save', unique);

module.exports = mongoose.model('user', User);
