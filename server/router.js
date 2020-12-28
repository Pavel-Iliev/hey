const Router = require('koa-router');
const router = new Router();
const { getNews, postNews, deleteNews } = require('./controllers')

router.get('/news', getNews);
router.post('/news', postNews);
router.delete('/news/:id', deleteNews);

module.exports = { router };