const { required } = require('@hapi/joi');
const Router = require('koa-router');
const router = new Router();
const { getNews, postNews, deleteNews, getFilters, postFilters, deleteFilters, getTime, postTime } = require('./controllers');
const { authorizeRoute } = require('./authorizationRoutes');
const { loginUser, registerUser, getUser } = require('./controllersRegister');

const routerRegister = new Router({ prefix: '/api/user'});


//router for news
router.get('/news', getNews);
router.post('/news', postNews);
router.delete('/news/:id', deleteNews);

//router for users
routerRegister.post('/register', registerUser);
routerRegister.post('/login', loginUser);
routerRegister.get('/user', authorizeRoute , getUser)

//router for filters
router.get('/filters', getFilters);
router.post('/filters', postFilters);
router.delete('/filters/:id', deleteFilters);

//router for time
router.get('/time', getTime);
router.post('/time', postTime);

module.exports = { router, routerRegister };