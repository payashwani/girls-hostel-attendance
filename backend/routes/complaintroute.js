// routes/complaintRoutes.js
const express = require('express');
const Complaint = require('../models/complaint'); // Complaint model
const router = express.Router();

// Route to create a new complaint
router.post('/', async (req, res) => {
  const { message, userId } = req.body;
  try {
    const newComplaint = new Complaint({ message, user: userId });
    await newComplaint.save();
    res.status(201).json(newComplaint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get all complaints
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('user');
    res.json(complaints);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Export the router
module.exports = router;
