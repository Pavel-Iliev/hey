const { newsModel } = require('./model/newsModel');
const { filtersModel } = require('./model/filtersModel');
const { TimeModel } = require('./model/timeModel');
const { userModel } = require('./model/userModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { compareSync } = require('bcrypt');

async function getNews(ctx) {
  const authHeader = ctx.request.headers['authorization'];
  const token = authHeader;  

  try {
    const {_id} = jwt.verify(token, process.env.TOKEN_SECRET);
    const { news } = await userModel.findOne({ _id }).populate('news')
    ctx.status = 200;
    ctx.body = news;
  } catch (error) {
    ctx.status = 500;
    console.error(error);
  }
}

async function postNews(ctx) {
  const authHeader = ctx.request.headers['authorization'];
  const token = authHeader;

  try {
    const {_id} = jwt.verify(token, process.env.TOKEN_SECRET);
    const { author, description, publishedAt, source, title, url, urlToImage } = ctx.request.body;
    const messages = new newsModel({ author, description, publishedAt, source, title, url, urlToImage });
    await messages.save();
    
    const user = await userModel.findOne({ _id });

    user.news.push(messages._id);
    await user.save();
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
  const token = authHeader;  

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
  const authHeader = ctx.request.headers['authorization'];
  const token = authHeader;
  try {
    const {_id} = jwt.verify(token, process.env.TOKEN_SECRET);

    const { filter } = ctx.request.body;
    const filters = new filtersModel({ filter, userId: _id });
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
  const token = authHeader;
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
  const authHeader = ctx.request.headers['authorization'];
  const token = authHeader;
  try {
    const {_id} = jwt.verify(token, process.env.TOKEN_SECRET);
    const { time } = ctx.request.body;
    const times = new TimeModel({ time, userId: _id });
    await times.save();
    ctx.body = times;
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    console.error(error);
  }
}

module.exports = { getNews, postNews, deleteNews, getFilters, postFilters, deleteFilters, getTime, postTime };