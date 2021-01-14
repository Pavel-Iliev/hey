const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { userModel } = require('./model/userModel');
dotenv.config();

// middleware function to be added to protected routes
async function authorizeRoute(ctx, next) {

  const authenticationHeaders = ctx.request.headers['authorization'];

  if (!authenticationHeaders) {
    ctx.status = 401; //access denied
    return (ctx.body = 'Access Denied');
  }
  try {
    const { _id } = jwt.verify(authenticationHeaders, process.env.TOKEN_SECRET);
    const user = await userModel.findOne({ _id });
    console.log(user);
    ctx.user = user;
    next();
  } catch (error) {
    ctx.status = 401;
    ctx.body = 'Invalid Token';
  }
}
module.exports = { authorizeRoute };