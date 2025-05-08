import { useState } from "react";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      const { token } = response.data;

      // ✅ Save token and update login state
      localStorage.setItem("token", token);
      setIsLoggedIn(true);

      // ✅ Redirect to homepage
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed!");
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "50px" }}>
      <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px" }}>
        <Typography variant="h5" gutterBottom>Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Email" variant="outlined" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;
