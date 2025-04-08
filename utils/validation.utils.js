const Joi = require('joi');
const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const validateUserData = {
  body: Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'customer').required(),
  }),

  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
  }),

  params: Joi.object({
    id: Joi.string().pattern(objectIdPattern).required().messages({
      'string.pattern.base': 'Invalid MongoDB ObjectId'
    }),
  }),
};

const validatePostData = {
  body: Joi.object({
    title: Joi.string().min(3).max(100).required(),
    content: Joi.string().min(10).required(),
  }),
};

const validateCommentData = {
  body: Joi.object({
    text: Joi.string().min(1).max(300).required(),
    postId: Joi.string().length(24).hex().required()
  }),
};

module.exports = { validateUserData, validatePostData, validateCommentData };
