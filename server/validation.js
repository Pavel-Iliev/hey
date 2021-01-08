const Joi = require('@hapi/joi');

function userValidation(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(4).max(255),
    email: Joi.string().required().min(6).max(255),
    password: Joi.string().required().min(8).max(1000),
  });
  return schema.validate(user);
}


function loginValidation(user) { 
  const schema = Joi.object({
    email: Joi.string().required().min(6).max(255),
    password: Joi.string().required().min(8).max(1000),
  });
  return schema.validate(user);
}

module.exports = { userValidation, loginValidation };