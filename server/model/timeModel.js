const mongoose = require('./');

const Schema = mongoose.Schema;
const Time = new Schema({
  time: {
    type: String,
    required: true
  }
});

const TimeModel = mongoose.model('Time', Time);

module.exports = { TimeModel };