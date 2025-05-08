// routes/foodMenuRoutes.js
const express = require('express');
const FoodMenu = require('../models/foodmenu'); // FoodMenu model
const router = express.Router();

// Route to add a new weekly food menu
router.post('/', async (req, res) => {
  const { week, menuItems } = req.body;
  try {
    const newMenu = new FoodMenu({ week, menuItems });
    await newMenu.save();
    res.status(201).json(newMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get the food menu for a specific week
router.get('/:week', async (req, res) => {
  try {
    const foodMenu = await FoodMenu.findOne({ week: req.params.week });
    if (!foodMenu) {
      return res.status(404).json({ message: 'Menu not found' });
    }
    res.json(foodMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Export the router
module.exports = router;

