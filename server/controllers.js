const { newsModel } = require('./model/newsModel');
const { filtersModel } = require('./model/filtersModel');
const { TimeModel } = require('./model/timeModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

async function getNews(ctx) {
  try {
    const events = await newsModel.find({});
    ctx.status = 200;
    ctx.body = events;
  } catch (error) {
    ctx.status = 500;
    console.error(error);
  }
}

async function postNews(ctx) {
  try {
    const { author, description, publishedAt, source, title, url, urlToImage } = ctx.request.body;
    const messages = new newsModel({ author, description, publishedAt, source, title, url, urlToImage });
    await messages.save();
    // aggiunto per
    ctx.body = messages;
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    console.error(error);
  }
}

async function deleteNews(ctx) {
  try {
    const id = ctx.params.id;
    ctx.status = 204;
    await newsModel.deleteOne({
      _id: id
    });
  } catch (err) {
    ctx.status = 500;
    console.error(error)
  }
}


//controllers for filters
async function getFilters(ctx) {
  const authHeader = ctx.request.headers['authorization'];
  const token = authHeader.split(' ')[1];

  try {
    const {_id} = jwt.verify(token, process.env.TOKEN_SECRET);
    const filters = await filtersModel.find({ userId: _id });
    ctx.status = 200;
    ctx.body = filters;
  } catch (error) {
    ctx.status = 500;
    console.error(error);
  }
}

async function postFilters(ctx) {
  console.log(ctx.request.body)
  try {
    const { filter, userId } = ctx.request.body;
    const filters = new filtersModel({ filter, userId });
    await filters.save();
    ctx.body = filters;
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    console.error(error);
  }
}

async function deleteFilters(ctx) {
  try {
    const id = ctx.params.id;
    ctx.status = 204;
    await filtersModel.deleteOne({
      _id: id
    });
  } catch (err) {
    ctx.status = 500;
    console.error(error)
  }
}

//controllers for time

async function getTime(ctx) {
  const authHeader = ctx.request.headers['authorization'];
  const token = authHeader.split(' ')[1];
  try {
    const {_id} = jwt.verify(token, process.env.TOKEN_SECRET);
    const time = await TimeModel.find({ userId: _id });
    ctx.status = 200;
    ctx.body = time;
  } catch (error) {
    ctx.status = 500;
    console.error(error);
  }
}

async function postTime(ctx) {
  try {
    const { time, userId } = ctx.request.body;
    const times = new TimeModel({ time, userId });
    await times.save();
    ctx.body = times;
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    console.error(error);
  }
}

module.exports = { getNews, postNews, deleteNews, getFilters, postFilters, deleteFilters, getTime, postTime };