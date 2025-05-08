const mongoose = require('mongoose');

const foodMenuSchema = new mongoose.Schema({
    day: { type: String, required: true },
    meals: { type: [String], required: true } // Example: ["Breakfast: Idli", "Lunch: Rajma Rice"]
});

const FoodMenu = mongoose.model('FoodMenu', foodMenuSchema);
module.exports = FoodMenu;
