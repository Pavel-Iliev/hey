const { newsModel } = require('./model/newsModel');

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

module.exports = { getNews, postNews, deleteNews };