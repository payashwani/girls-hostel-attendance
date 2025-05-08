import { useState } from "react";
import { TextField, Button, Container, Typography, Paper, MenuItem } from "@mui/material";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Form Data:", { name, email, phone, password, role }); // 👈 Check the data before sending
  
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email: email.trim(), // Just in case there's whitespace
        phone,
        password,
        role,
      });
  
      alert("Signup Successful! Please login.");
    } catch (error) {
      console.error("Signup Error:", error.response?.data); // 👈 Log error details
      alert(error.response?.data?.message || "Signup Failed!");
    }
  };
  

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "50px" }}>
      <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px" }}>
        <Typography variant="h5" gutterBottom>
          Signup
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
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            select
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="warden">Warden</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Signup
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Signup;
