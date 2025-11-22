import express, { Response } from 'express';
import requestLogger from "./middleware/logger";
import { notFoundHandler } from './middleware/notFoundHandler';
import routes from './routes';
import cors, { type CorsOptions } from 'cors';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const port = 31002;
const allowedOrigins = [
  'http://localhost:5173', // local dev
];

const corsOptions: CorsOptions = {
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

// Middleware
app.use(cors(corsOptions));
app.use(requestLogger);
app.use(express.json());

// root (for health check)
app.get('/', (req, res: Response) => {
  res.status(200).send({message: 'API is running.'});
});

// Mount other routers here
app.use('/api', routes);

// Additional Request Handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});