// schemas/userSchema.js

const Joi = require('joi');

const createUserSchema = Joi.object({
  // Define the validation rules as before
  username: Joi.string().alphanum().min(3).max(30).required(),
  
  password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})')).required().messages({
    'string.pattern.base': 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.',
  }),
  
  email: Joi.string().email().required(),
  
  role: Joi.string().valid('user', 'admin').optional(),
});

// Export the schema definition
module.exports = {
  createUserSchema,
  // You could add other schemas here too, like updateUserSchema
};