const { required } = require('@hapi/joi');
const Router = require('koa-router');
const router = new Router();
const { getNews, postNews, deleteNews } = require('./controllers');
const { authorizeRoute } = require('./authorizationRoutes');
const { loginUser, registerUser, getUser } = require('./controllersRegister');

const routerRegister = new Router({ prefix: '/api/user'});

router.get('/news', getNews); //authorizeRoute can be getNews only after the login of the user, not before
router.post('/news', authorizeRoute , postNews);
router.delete('/news/:id', authorizeRoute ,  deleteNews);

routerRegister.post('/register', registerUser);
routerRegister.post('/login', loginUser);
routerRegister.get('/user', authorizeRoute , getUser)

module.exports = { router, routerRegister };