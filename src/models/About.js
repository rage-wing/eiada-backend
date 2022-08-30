const mongoose = require('mongoose');
const { Schema } = mongoose;

const About = new Schema({
  title: {
    type: String,
    required: 'title is required',
  },
  content: {
    type: String,
    required: 'content is required',
  },
});

module.exports = mongoose.model('About', About);
