const mongoose = require('./');

const Schema = mongoose.Schema;
const Filters = new Schema({
  filter: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
});

const filtersModel = mongoose.model('Filters', Filters);

module.exports = { filtersModel };