import React from "react";
import { Container, Paper, Typography, Button } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";

const hostelAddress = "Shri Balaji Girls Hostel, 805, 806, Part I, Scheme No 114, Indore, Madhya Pradesh 452010";
const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hostelAddress)}`;

const Location = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #FFF3E0, #FFE0B2)", // Light Orange Gradient
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={5} style={{ padding: "30px", borderRadius: "12px", backgroundColor: "white", textAlign: "center" }}>
          <Typography variant="h5" gutterBottom style={{ color: "#D84315" }}>
            📍 Hostel Location
          </Typography>

          <Typography variant="body1" style={{ marginBottom: "15px", color: "#5D4037" }}>
            {hostelAddress}
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            startIcon={<RoomIcon />}
            fullWidth
            onClick={() => window.open(googleMapsUrl, "_blank")}
          >
            Open in Google Maps
          </Button>
        </Paper>
      </Container>
    </div>
  );
};

export default Location;
