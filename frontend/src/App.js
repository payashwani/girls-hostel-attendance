import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import Attendance from './pages/Attendance';
import Complaint from './pages/Complaint';
import Fees from './pages/Fees';
import FoodMenu from './pages/FoodMenu';
import Location from './pages/Location';
import Hostel from './pages/Hostel';
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <div className="flex">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/fees" element={<Fees />} />
          <Route path="/foodmenu" element={<FoodMenu />} />
          <Route path="/location" element={<Location />} />
          <Route path="/hostel" element={<Hostel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;