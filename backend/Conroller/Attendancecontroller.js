const Attendance = require('../models/Attendance');

// Mark Attendance (when girls upload photos later)
const markAttendance = async (req, res) => {
  const { girlName, isPresent, photoUrl } = req.body;

  const attendance = new Attendance({
    girlName,
    isPresent,
    photoUrl,
  });

  try {
    await attendance.save();
    res.status(201).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error marking attendance', error });
  }
};

// Get Today’s Attendance
const getTodayAttendance = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  try {
    const attendance = await Attendance.find({
      date: { $gte: today, $lt: tomorrow },
    });
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching today’s attendance', error });
  }
};

// Get Yesterday’s Attendance
const getYesterdayAttendance = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  try {
    const attendance = await Attendance.find({
      date: { $gte: yesterday, $lt: today },
    });
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching yesterday’s attendance', error });
  }
};

module.exports = {
  markAttendance,
  getTodayAttendance,
  getYesterdayAttendance,
};
