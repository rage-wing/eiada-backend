const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const Article = new Schema({
  thumbnail: {
    type: String,
    required: 'thumbnail is required',
  },
  title: {
    type: String,
    required: 'title is required',
  },
  content: {
    type: String,
    required: 'content is required',
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
    required: 'author is required',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

Article.plugin(mongoosePaginate);

module.exports = mongoose.model('Article', Article);
