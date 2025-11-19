import { z } from 'zod';

export const createCarSchema = z.object({
  // Define the validation rules as before
  make: z.string().min(2).max(30),
  carModel: z.string().min(1).max(60),
  year: z.number().min(1000).max(9999),
  info: z.string().optional(),
});