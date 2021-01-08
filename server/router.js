const { required } = require('@hapi/joi');
const Router = require('koa-router');
const router = new Router();
const { getNews, postNews, deleteNews } = require('./controllers')
const { loginUser, registerUser } = require('./controllersRegister');

const routerRegister = new Router({ prefix: '/api/user'});

router.get('/news', getNews);
router.post('/news', postNews);
router.delete('/news/:id', deleteNews);

routerRegister.post('/register', registerUser);
routerRegister.post('/login', loginUser);

module.exports = { router, routerRegister };