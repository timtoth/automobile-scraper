import express from 'express';
// import { requestLogger } from './route-middleware/logger';
import requestLogger from "./middleware/logger";
import routes from './routes';
import cors, { type CorsOptions } from 'cors';


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

// 1. Import the router module

// Middleware to parse JSON request bodies
app.use(cors(corsOptions));
app.use(requestLogger);
app.use(express.json());

// Basic Root Endpoint (for health check)
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Mount other routers here
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});