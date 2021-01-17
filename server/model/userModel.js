const mongoose = require('./');

const Schema = mongoose.Schema;

const User = new Schema({
  name: {
    type: String,
    required: true,
    min: 4,
    max : 255
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max : 255
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max : 1000
  },
  date: {
    type: String,
    default: Date.now()
  },
  news: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'News'
    }
  ]  
});

const userModel = mongoose.model('User', User);

module.exports = { userModel };