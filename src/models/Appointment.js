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
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Appointment', Appointment);
