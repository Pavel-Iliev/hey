const mongoose = require('./');

const Schema = mongoose.Schema;
const News = new Schema({
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  publishedAt: {
    type: String,
    default: new Date(Date.now()),
    required: true
  },
  source: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  urlToImage: {
    type: String,
    required: true
  }
});

const newsModel = mongoose.model('News', News);

module.exports = { newsModel };