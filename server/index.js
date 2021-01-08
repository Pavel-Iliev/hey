const Koa = require('koa');
const { router, routerRegister } = require('./router');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const dotenv = require('dotenv');
const app = new Koa();

dotenv.config();
app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(routerRegister.routes());

app.listen(process.env.PORT, () => console.log(`The server is running on http://localhost:${process.env.PORT} 💪`));