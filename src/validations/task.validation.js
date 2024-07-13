const Joi = require("joi");
const ApiError = require("../utils/ApiError");
const taskAddValidationSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title cannot be empty",
    "any.required": "Title  is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Description cannot be empty",
    "any.required": "Description is required",
  }),
  completed: Joi.boolean().required().messages({
    "any.required": "Completed flag is required",
  }),
});

const taskUpdateValidationSchema = Joi.object({

  title: Joi.string().optional().messages({
    "string.empty": "Title cannot be empty",
  }),
  description: Joi.string().optional().messages({
    "string.empty": "Description cannot be empty",
  }),
  completed: Joi.boolean().optional().messages({
    "any.required": "Completed flag is required",
  }),
});

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new ApiError(error.details[0].message, 400);
    }
    next();
  };
};

exports.taskAddValidation = validate(taskAddValidationSchema);
exports.taskUpdateValidation = validate(taskUpdateValidationSchema);
