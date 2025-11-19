import { z } from 'zod';

export const userRegSchema = z.object({
  // Define the validation rules as before
  username: z.string().min(3, { message: 'User name must be at least 3 characters long' }),
  //password: z.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, { message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.' }),
  password: z.string().min(8),
  email: z.email({ pattern: z.regexes.html5Email, message: 'Must be a valid email address' })
});
