import React, { useState } from "react";
import axios from "axios";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";

const Fees = () => {
  const [screenshot, setScreenshot] = useState(null);
  const [studentId, setStudentId] = useState("");

  const handleScreenshotChange = (e) => {
    setScreenshot(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentId || !screenshot) {
      alert("⚠️ Please enter your Student ID and upload a screenshot.");
      return;
    }

    const formData = new FormData();
    formData.append("studentId", studentId);
    formData.append("screenshot", screenshot);

    try {
      await axios.post("http://localhost:5000/api/Fees", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Fee uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Error uploading fee!");
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
            Upload Fee Payment Screenshot
          </Typography>

          <form onSubmit={handleSubmit} style={{ marginTop: "15px" }}>
            <TextField
              label="Student ID"
              variant="outlined"
              fullWidth
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              style={{ marginBottom: "15px" }}
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleScreenshotChange}
              style={{
                display: "block",
                margin: "10px auto",
                padding: "10px",
                border: "1px solid #6A1B9A",
                borderRadius: "5px",
              }}
            />

            {/* ✅ Button Section */}
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              style={{ marginTop: "15px" }}
            >
              📤 Submit Fee
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Fees;
