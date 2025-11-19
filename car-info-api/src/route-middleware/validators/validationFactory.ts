import type { NextFunction, Response, Request } from "express";
import z from 'zod';

export const validateModel = (schema: z.ZodObject) => (req: Request, res: Response, next: NextFunction) => {
  // check req.query and req.params before req.body
  try {
    schema.parse(req.body);
    next();
  }catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: error.issues.map(err => ({
            field: err.path.join('.'), // field from path
            message: err.message       // message
          }))
        });
      }
      next(error); 
    }
};