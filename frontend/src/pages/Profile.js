import React, { useState } from "react";
import axios from "axios";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profileData = { name, email, phone, roomNumber };

    try {
      await axios.post("http://localhost:5000/api/Profile", profileData);
      alert("Profile created successfully!");
    } catch (error) {
      console.error(error);
      alert("Error creating profile!");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #E1BEE7, #CE93D8)", // Soft Purple Gradient
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
          }}
        >
          <Typography variant="h5" gutterBottom style={{ color: "#6A1B9A" }}>
            Profile Information
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              margin="normal"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              label="Room Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              style={{
                backgroundColor: "#6A1B9A",
                color: "white",
                marginTop: "15px",
              }}
            >
              Save Profile
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Profile;
