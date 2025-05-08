const express = require('express');
const User = require('../models/user'); // Import the User model (updated to user.js)
const router = express.Router();

// Route to create a new profile
router.post('/', async (req, res) => {
  const { name, email, phone, roomNumber } = req.body;
  try {
    const newProfile = new User({ name, email, phone, roomNumber});  // Updated to use User model
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get all profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await User.find();  // Updated to use User model
    res.json(User);  
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Export the router
module.exports = router;
