// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const port = 31002;
const allowedOrigins = [
  'http://localhost:5173', // For development testing (Vite default)
  //'https://www.your-production-app.com', // Your actual deployed frontend URL
  //'https://staging.your-app.com' // Any other legitimate domain
];

const corsOptions = {
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
const loggerMiddleware = require('./route-middleware/logger');
const carInfoRouter = require('./routes/car-info');
const landingRouter = require('./routes/landing');

// Middleware to parse JSON request bodies
app.use(cors(corsOptions));
app.use(loggerMiddleware);
app.use(express.json());

// Basic Root Endpoint (for health check)
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// 2. Mount the router at the base path '/api/users'
// All routes defined in users.js will now be prefixed with this path.
app.use('/api/car-info', carInfoRouter);
app.use('/api/car-info', landingRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});