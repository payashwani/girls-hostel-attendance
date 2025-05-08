import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const Complaint = () => {
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const complaintData = { message };

    try {
      await axios.post("http://localhost:5000/api/Complaint", complaintData);
      setSuccessMessage("✅ Complaint submitted successfully!");
      setMessage(""); // Clear the input field
    } catch (error) {
      console.error(error);
      setSuccessMessage("❌ Error submitting complaint!");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #E3F2FD, #BBDEFB)", // Light Blue Gradient
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={5} style={{ padding: "30px", borderRadius: "12px", backgroundColor: "white" }}>
          <Typography variant="h5" gutterBottom style={{ color: "#1565C0", textAlign: "center" }}>
            📝 Submit Your Complaint
          </Typography>

          {successMessage && (
            <Typography
              variant="body1"
              style={{
                color: successMessage.includes("Error") ? "red" : "green",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              {successMessage}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Enter your complaint"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ marginBottom: "10px" }}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              🚀 Submit Complaint
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Complaint;
