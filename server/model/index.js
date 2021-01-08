'use strict'
const dotenv = require('dotenv');
dotenv.config();

const { required } = require('@hapi/joi');
const mongoose = require('mongoose');
const mongodb = process.env.mongodb;

mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'my mongo doesnt work'));

module.exports = mongoose;