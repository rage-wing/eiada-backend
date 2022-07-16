const mongoose = require('mongoose');

const { Schema } = mongoose;

const Doctor = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: 'user is required',
  },
  about: {
    type: String,
    trim: true,
  },
  speciality: {
    type: String,
    enum: ['cardiology', 'dermatology', 'neurology', 'pediatrics', 'surgery'],
    required: 'speciality is required',
  },
  address: {
    type: String,
    required: 'address is required',
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: 'coordinates are required',
    },
  },
});

module.exports = mongoose.model('Doctor', Doctor);
