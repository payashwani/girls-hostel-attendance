// routes/feesRoutes.js
const express = require('express');
const Fees = require('../models/fees'); // Fees model
const router = express.Router();

// Route to upload fee payment screenshot
router.post('/', async (req, res) => {
  const { studentId, screenshotUrl } = req.body;
  try {
    const newFee = new Fees({ studentId, screenshotUrl });
    await newFee.save();
    res.status(201).json(newFee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get all fee records
router.get('/', async (req, res) => {
  try {
    const fees = await Fees.find();
    res.json(fees);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Export the router
module.exports = router;
