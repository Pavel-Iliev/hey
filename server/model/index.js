'use strict'

const mongoose = require('mongoose');
const mongodb = 'mongodb://localhost:27017/myMongo';

mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'my mongo doesnt work'));

module.exports = mongoose;