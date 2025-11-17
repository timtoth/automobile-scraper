// The 'schema' parameter is the Joi model (e.g., createUserSchema) 
const modelValidation = (schema) => (req, res, next) => {
  // We check req.body, but you could easily adjust this to check req.query or req.params
  const { error, value } = schema.validate(req.body, { 
    abortEarly: false, // Collect all errors
    allowUnknown: false, // Disallow fields not defined in the schema
    stripUnknown: true, // Remove fields not defined in the schema
  });

  if (error) {
    // Format the errors into a readable list
    const errors = error.details.map(detail => detail.message);
    
    // Stop the request and send a 400 Bad Request
    return res.status(400).json({ 
      status: 'error',
      message: 'Validation failed for the request data.',
      errors: errors 
    });
  }

  // Sanitize req.body with the validated and cleaned 'value'
  req.body = value; 
  
  // Validation passed. Proceed to the route handler.
  next();
};

module.exports =  { modelValidation };