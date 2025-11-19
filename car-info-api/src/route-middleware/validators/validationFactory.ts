import type { NextFunction, Response, Request } from "express";
import z from 'zod';

export const validateModel = (schema: z.ZodObject) => (req: Request, res: Response, next: NextFunction) => {
  // check req.query and req.params before req.body
  try {
    schema.parse(req.body);
  }catch (error) {
      if (error instanceof z.ZodError) {
        // Validation failed, send a 400 Bad Request response
        return res.status(400).json({
          message: 'Validation failed',
          // Format errors into a more readable structure
          errors: error.issues.map(err => ({
            field: err.path.join('.'), // Field that failed validation
            message: err.message       // Error message
          }))
        });
      }
      // Handle other potential errors (should be rare)
      next(error); 
    }
};