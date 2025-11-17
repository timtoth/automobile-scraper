// routes/users.js

const express = require('express');
const router = express.Router();

//import middleware
const { modelValidation } = require("../route-middleware/validators/validationFactory");
const validateCreateCarSchema = require("../route-middleware/schemas/carInfoSchema");

const authCheck = (req, res, next) => {
  // Check if a token exists and is valid
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send('Access Denied: No Token Provided');
  }
  // If valid, call next()
  console.log('User authenticated!');
  next();
};

// router.use(authCheck);

const testData = [
  { id: 101, make: 'Tesla', model: 'Model 3', year: 2023, color: 'Red' },
  { id: 102, make: 'Toyota', model: 'Camry', year: 2022, color: 'Silver' },
  { id: 103, make: 'Ford', model: 'Mustang', year: 1969, color: 'Black' },
  { id: 104, make: 'Honda', model: 'CR-V', year: 2024, color: 'Blue' },
  { id: 105, make: 'BMW', model: 'X5', year: 2021, color: 'White' },
  { id: 105, make: 'BMW', model: 'i4', year: 2025, color: 'Blue' },
];

// Define a GET request to retrieve all users
router.get('/', (req, res) => {
  console.log('Fetching Car Data for Landing');
  // TODO: Fetch from postgres
  setTimeout(() => {
    res.json({ cars: testData });
  }, 500);
});

// Define a GET request to retrieve a specific user by ID
router.get('/:id', (req, res) => {
  const carInfoId = req.params.id;
  console.log(`Fetching Car Data for ${carInfoId}`);
  const car = testData.find(x => x.id === carInfoId) || { make: 'Unknown', model: 'Unknown', year: 'N/A' };
  res.json({ ...car , price: Math.floor(Math.random() * 20000 ) + 20000});
});
  
// Define a POST request to create a new user
router.post('/', modelValidation(validateCreateCarSchema), (req, res) => {
  const newInfo = req.body;

  // Here, we should save to postgres

  console.log('New Car Info Data (Validated):', newInfo);
  res.status(201).json({ 
    message: 'User created successfully.',
    data: newInfo
  });

  // Assuming the user data is in req.body
  res.status(201).json({ message: 'User created successfully' });
});

// Export the router so it can be used by the main application
module.exports = router;