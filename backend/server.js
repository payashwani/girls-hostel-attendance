const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes'); // ✅ Add authentication routes

require('dotenv').config();

const profileRoute = require('./routes/profileroute');
const complaintRoute = require('./routes/complaintroute');
const attendanceRoute = require('./routes/attendanceroute');
const feesRoute = require('./routes/feesroute');
const foodMenuRoute = require('./routes/foodmenuroute');



const app = express();
const port = 5000; // Declare the port to be used for the backend server

// Middleware to parse incoming JSON data
app.use(express.json());
// Enable CORS for the frontend to connect
app.use(cors());

// ✅ Authentication Routes
app.use("/api/auth", authRoutes); 

app.use('/api/Profile', profileRoute);
app.use('/api/Complaint', complaintRoute);
app.use('/api/Attendance', attendanceRoute);
app.use('/api/Fees', feesRoute);
app.use('/api/FoodMenu', foodMenuRoute);

// MongoDB connection string (from .env)
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.log('MongoDB connection error:', err);
});

// Sample route for testing
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Start the server on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
