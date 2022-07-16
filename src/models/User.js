const mongoose = require('mongoose');
const unique = require('../utils/unique');

const { Schema } = mongoose;

const User = new Schema({
  uid: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: 'uid is required',
  },
  displayName: {
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
  phoneNumber: {
    type: String,
    trim: true,
    match: [/^[0-9]{11}$/, 'not valid phone number'],
  },
  photoURL: {
    type: String,
    trim: true,
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
  joined: {
    type: Date,
    default: Date.now,
  },
});

// handling unique errors
User.post('save', unique);

module.exports = mongoose.model('User', User);
