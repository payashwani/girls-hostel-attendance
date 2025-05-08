const express = require('express');
const Attendance = require('../models/Attendance');
const router = express.Router();
const faceapi = require('face-api.js'); // Install this package
const fs = require('fs');
const path = require('path');
const { loadImage } = require('canvas');

// ✅ Function to verify face using AI
async function verifyFace(imageBase64, studentName) {
  const studentImagePath = path.join(__dirname, `../student_photos/${studentName}.png`);
  
  if (!fs.existsSync(studentImagePath)) {
    return false; // No stored image found
  }

  // Convert base64 to buffer
  const buffer = Buffer.from(imageBase64.split(',')[1], 'base64');
  fs.writeFileSync('temp.png', buffer); // Save the captured image temporarily

  // Load images
  const capturedImage = await loadImage('temp.png');
  const storedImage = await loadImage(studentImagePath);

  // Detect faces in both images
  const capturedFace = await faceapi.detectSingleFace(capturedImage).withFaceLandmarks().withFaceDescriptor();
  const storedFace = await faceapi.detectSingleFace(storedImage).withFaceLandmarks().withFaceDescriptor();

  if (!capturedFace || !storedFace) {
    return false;
  }

  // Compare face descriptors
  const distance = faceapi.euclideanDistance(capturedFace.descriptor, storedFace.descriptor);
  return distance < 0.5; // Lower is better, threshold = 0.5
}

// ✅ API to mark attendance
router.post('/', async (req, res) => {
  const { date, name, status, image, latitude, longitude } = req.body;
  const hostelLocation = { lat: 22.7196, lon: 75.8577 }; // Update this with your hostel coordinates

  try {
    // ✅ Step 1: Location Verification
    const isNearHostel =
      Math.abs(latitude - hostelLocation.lat) < 0.002 &&
      Math.abs(longitude - hostelLocation.lon) < 0.002;

    if (!isNearHostel) {
      return res.status(400).json({ message: "You are not at the hostel location!" });
    }

    // ✅ Step 2: Face Verification
    const isFaceMatch = await verifyFace(image, name);
    if (!isFaceMatch) {
      return res.status(400).json({ message: "Face verification failed!" });
    }

    // ✅ Step 3: Mark Attendance
    let attendanceRecord = await Attendance.findOne({ date });
    if (!attendanceRecord) {
      attendanceRecord = new Attendance({ date, students: [] });
    }

    const existingStudent = attendanceRecord.students.find((s) => s.name === name);
    if (existingStudent) {
      return res.status(400).json({ message: 'Attendance already marked today.' });
    }

    attendanceRecord.students.push({ name, status, imageUrl: `stored/${name}.png` });
    await attendanceRecord.save();
    
    res.status(201).json({ message: "✅ Attendance marked successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

