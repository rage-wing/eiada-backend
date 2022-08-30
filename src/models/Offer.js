const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const Offer = new Schema({
  thumbnail: {
    type: String,
    required: 'offer thumbnail is required',
  },
  url: {
    type: String,
  },
  validUntil: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

Offer.plugin(mongoosePaginate);

module.exports = mongoose.model('Offer', Offer);
