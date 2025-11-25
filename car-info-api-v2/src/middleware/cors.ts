import { CorsOptions } from "cors";

const allowedOrigins = [
  'http://localhost:5173', // local dev
];

export const corsOptions: CorsOptions = {
  // Check if the requesting origin is in the allowedOrigins list
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); 
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
  preflightContinue: false,
  optionsSuccessStatus: 204
};