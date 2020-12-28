const Koa = require('koa');
const { router } = require('./router');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const PORT = 3200;

app.use(bodyParser());
app.use(router.routes());

app.listen(PORT, () => console.log(`The server is running on http://localhost:${PORT} 💪`));