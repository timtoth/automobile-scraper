// routes/users.js

const express = require('express');
const router = express.Router();

// Define a GET request to retrieve all users
router.get('/', (req, res) => {
  res.json({ message: 'Landing Page' });
});

// Export the router so it can be used by the main application
module.exports = router;