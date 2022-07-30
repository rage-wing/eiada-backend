const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const Image = new Schema({
  url: {
    type: String,
    required: 'image is required',
  },
  mimetype: {
    type: String,
  },
  originalname: {
    type: String,
  },
  size: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

Image.plugin(mongoosePaginate);

module.exports = mongoose.model('Image', Image);
