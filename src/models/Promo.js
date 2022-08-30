const mongoose = require('mongoose');

const { Schema } = mongoose;

const Promo = new Schema({
  code: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: 'amount is required',
  },
  type: {
    type: String,
    enum: ['flat', 'percent'],
    default: 'flat',
  },
  validUntil: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Promo', Promo);
