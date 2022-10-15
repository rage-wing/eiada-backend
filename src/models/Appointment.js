const mongoose = require('mongoose');

const { Schema } = mongoose;

const Appointment = new Schema({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
    required: 'doctor is required',
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: 'patient is required',
  },
  childName: {
    type: String,
    required: 'child name is required',
  },
  childBirthDate: {
    type: Date,
    required: 'child birthdate is required',
  },
  childGender: {
    type: String,
    enum: ['male', 'female'],
    required: 'child gender is required',
  },
  userAddress: {
    type: String,
  },
  userPhoneNumber: {
    type: String,
    required: 'user phone number is required',
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
  type: {
    type: String,
    enum: ['in-person', 'online'],
    default: 'in-person',
  },
  link: {
    type: String,
    default: 'https://www.google.com/maps/@29.976974,31.261807,15z',
  },
  date: {
    type: Date,
    required: true,
  },
  paid: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Appointment', Appointment);
