const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { userModel } = require('./model/userModel');
const { userValidation, loginValidation } = require('./validation');

dotenv.config();

async function loginUser(ctx) {
  const { email, password } = ctx.request.body;
  const { error } = loginValidation({email, password});

  if (error) {
    ctx.status = 400;
    return ctx.body = error.details[0].message;
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    ctx.status = 400;
    return ctx.body = 'The password or the email are invalid';
  }
  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    ctx.status = 400;
    return ctx.body = 'The password is invalid';
  }

  //Create token

  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {
    expiresIn: '24h' 
  })
  ctx.set('auth-token', token);
  ctx.body = token;
}

async function registerUser(ctx) {
  const { name, email, password } = ctx.request.body;
  const { error } = userValidation({name, email, password});

  if (error) {
    ctx.status = 400;
    return ctx.body = error.details[0].message;
  }

  const emailExists = await userModel.findOne({ email });
  if (emailExists) {
    ctx.status = 400;
    return ctx.body = 'The email already exists!';
  }

  //Create token
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = new userModel({name, email, password : hashPassword})

  try {
    const { _id } = await user.save();
    const token = jwt.sign({_id}, process.env.TOKEN_SECRET);
    ctx.body = token;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
}

async function getUser(ctx) {
  try {
    const {_id, name, email} = ctx.user;
    const user = {_id, name, email};
    ctx.body = user;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
}


module.exports = { loginUser, registerUser, getUser };