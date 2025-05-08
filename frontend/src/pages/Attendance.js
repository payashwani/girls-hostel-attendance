import React, { useEffect, useState, useRef } from "react";
import { Container, Paper, Typography, Button, TextField } from "@mui/material";

const Attendance = () => {
  const [location, setLocation] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState(null);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          setError("⚠️ Location access is required to mark attendance.");
        }
      );
    } else {
      setError("❌ Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError("❌ Unable to access the webcam.");
      }
    };
    startWebcam();
  }, []);

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) {
      setError("⚠️ Webcam not initialized properly.");
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");
    setImage(imageData);
  };

  const markAttendance = async () => {
    if (!location) {
      setError("⚠️ Fetching location...");
      return;
    }
    if (!name) {
      setError("⚠️ Please enter your name.");
      return;
    }
    if (!image) {
      setError("⚠️ Please capture your photo for verification.");
      return;
    }

    try {
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: new Date().toISOString().split("T")[0],
          name,
          status: "Present",
          image,
          latitude: location.latitude,
          longitude: location.longitude,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setAttendanceStatus("✅ Attendance marked successfully!");
      } else {
        setError(data.message || "❌ Failed to mark attendance.");
      }
    } catch (error) {
      setError("❌ Error submitting attendance. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #E1BEE7, #CE93D8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={5}
          style={{
            padding: "30px",
            borderRadius: "12px",
            backgroundColor: "white",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" gutterBottom style={{ color: "#6A1B9A" }}>
            AI-Based Attendance
          </Typography>

          {error && <Typography color="error">{error}</Typography>}
          {attendanceStatus && <Typography color="success">{attendanceStatus}</Typography>}

          <TextField
            label="Enter Your Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginTop: "10px" }}
          />

          {/* ✅ Webcam feed */}
          <div style={{ marginTop: "20px", position: "relative" }}>
            <video
              ref={videoRef}
              autoPlay
              style={{
                width: "100%",
                maxHeight: "250px",
                border: "2px solid #6A1B9A",
                borderRadius: "8px",
              }}
            ></video>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          </div>

          {/* ✅ Buttons aligned in a row */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: "15px",
              flexWrap: "wrap",
            }}
          >
            <Button variant="contained" color="secondary" onClick={captureImage}>
              📸 Capture Image
            </Button>

            <Button variant="contained" color="success" onClick={markAttendance} disabled={!location}>
              ✅ Mark Attendance
            </Button>
          </div>

          {/* ✅ Display captured image preview */}
          {image && (
            <div style={{ marginTop: "20px" }}>
              <img
                src={image}
                alt="Captured"
                style={{
                  width: "100%",
                  maxHeight: "250px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Attendance;

