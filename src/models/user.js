const mongoose = require('mongoose');
const unique = require('../utils/unique');

const { Schema } = mongoose;

const User = new Schema({
  name: {
    type: String,
    required: 'name is required',
    trim: true,
  },
  phone: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: 'phone is required',
    match: [
      /^[0-9]{11}$/,
      'not valid phone number',
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
