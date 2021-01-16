const Koa = require('koa');
const { router, routerRegister } = require('./router');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const dotenv = require('dotenv');
const app = new Koa();
// const axios = require('axios');

// axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=797f19cbeedc498184dd394628e6bbd4').then(data => console.log(data))

dotenv.config();
app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(routerRegister.routes());

app.listen(process.env.PORT, () => console.log(`The server is running on http://localhost:${process.env.PORT} 💪`));