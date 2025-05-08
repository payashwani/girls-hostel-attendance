const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true, // Each day should have a single record
  },
  students: [
    {
      
      name: {
        type: String, // If you are not using User model, you can store name directly.
        required: true,
      },
      status: {
        type: String,
        enum: ['Present', 'Absent'],
        required: true,
      },
      imageUrl: {
        type: String, // Optional: If you're capturing an image for verification
      },
    },
  ],
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
