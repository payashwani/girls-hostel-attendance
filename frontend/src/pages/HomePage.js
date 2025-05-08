import React from "react";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import "./Homepage.css";
import img1 from './img1.webp';
import img2 from './img2.webp';
import img3 from './img3.webp'; // if you have a third image

const HomePage = () => {
  const navigate = useNavigate();
  const wardensPhoneNumber = "7000904059";

  const sections = [
    { title: "Profile", path: "/profile" },
    { title: "Attendance", path: "/attendance" },
    { title: "Fees", path: "/fees" },
    { title: "Food Menu", path: "/food-menu" },
    { title: "Complaint", path: "/complaint" },
    { title: "Location", path: "/location" },
    { title: "Login", path: "/login" },
    { title: "Signup", path: "/signup" },
  ];

  return (
    <div className="homepage-container">
      {/* Header */}
      <div className="header">
        <h1 className="welcome-heading">Welcome to Shri Balaji Girls Hostel</h1>
        <p className="sub-heading">A Home Away From Home!</p>
      </div>

      {/* Main Layout */}
      <div className="main-layout">
        {/* Sidebar */}
        <div className="sidebar">
          {sections.map((section, index) => (
            <div
              key={index}
              className="sidebar-item"
              onClick={() => navigate(section.path)}
            >
              {section.title}
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="main-content">
          {/* Image Carousel */}
          <div className="image-carousel">
          <img src={img1} alt="College Life" className="animated-image" />
          <img src={img2} alt="Hostel Life" className="animated-image" />
          <img src={img3} alt="Comfortable Stay" className="animated-image" />

          </div>

          {/* WhatsApp Contact */}
          <a
            href={`https://wa.me/${wardensPhoneNumber}`}
            className="whatsapp-icon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp size={40} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
