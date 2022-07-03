const mongoose = require('mongoose');
const unique = require('../utils/unique');

const { Schema } = mongoose;

const User = new Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: 'email is required',
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/, 'not valid email'],
  },
  role: {
    type: String,
    enum: ['admin', 'doctor', 'user'],
    default: 'user',
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[0-9]{11}$/, 'not valid phone number'],
  },
  joined: {
    type: Date,
    default: Date.now,
  },
});

// handling unique errors
User.post('save', unique);

module.exports = mongoose.model('User', User);
