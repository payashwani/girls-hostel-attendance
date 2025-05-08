const mongoose = require('mongoose');

const feesSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    paymentScreenshot: { type: String, required: true }, // Store payment image URL
    amount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
    date: { type: Date, default: Date.now }
});

const Fees = mongoose.model('Fees', feesSchema);
module.exports = Fees;
