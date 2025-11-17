// schemas/userSchema.js

const Joi = require('joi');

const createCarSchema = Joi.object({
  // Define the validation rules as before
  make: Joi.string().alphanum().min(2).max(30).required(),
  model: Joi.string().min(1).max(60).required(),
  year: Joi.number().min(1000).max(9999).required(),
  info: Joi.string().optional(),
});

// Export the schema definition
module.exports = {
  createCarSchema
  // You could add other schemas here too, like updateUserSchema
};