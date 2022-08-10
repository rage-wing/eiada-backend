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
    required: 'user address is required',
  },
  userPhoneNumber: {
    type: String,
    required: 'user phone number is required',
  },
  status: {
    type: String,
    enum: ['draft', 'pending', 'confirmed', 'cancelled'],
    default: 'draft',
  },
  type: {
    type: String,
    enum: ['in-person', 'online'],
    default: 'in-person',
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  paid: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Appointment', Appointment);
