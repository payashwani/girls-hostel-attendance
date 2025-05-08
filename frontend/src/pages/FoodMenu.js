import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const FoodMenu = () => {
  const [menu, setMenu] = useState({
    Monday: "",
    Tuesday: "",
    Wednesday: "",
    Thursday: "",
    Friday: "",
    Saturday: "",
    Sunday: "",
  });

  const [menuData, setMenuData] = useState([]);

  // Fetch the existing menu from the database
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/FoodMenu/1");
        setMenuData(response.data.menuItems);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMenu();
  }, []);

  const handleChange = (day, value) => {
    setMenu((prevMenu) => ({ ...prevMenu, [day]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/FoodMenu", {
        menuItems: Object.values(menu),
      });

      alert("✅ Menu Updated Successfully!");
      setMenuData(Object.values(menu)); // Update the displayed menu
    } catch (error) {
      console.error(error);
      alert("❌ Error updating menu!");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #FFEBEE, #FFCDD2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md">
        <Paper elevation={5} style={{ padding: "30px", borderRadius: "12px", backgroundColor: "white" }}>
          <Typography variant="h5" gutterBottom style={{ color: "#D32F2F", textAlign: "center" }}>
            🥗 Hostel Food Menu
          </Typography>

          <form onSubmit={handleSubmit}>
            {Object.keys(menu).map((day) => (
              <TextField
                key={day}
                label={day}
                variant="outlined"
                fullWidth
                value={menu[day]}
                onChange={(e) => handleChange(day, e.target.value)}
                style={{ marginBottom: "10px" }}
              />
            ))}

            <Button type="submit" variant="contained" color="primary" fullWidth>
              📌 Save Menu
            </Button>
          </form>

          {/* ✅ Display the Weekly Menu in a Table */}
          <Typography variant="h6" style={{ marginTop: "20px", color: "#D32F2F", textAlign: "center" }}>
            🍽️ Weekly Food Menu
          </Typography>

          <TableContainer component={Paper} style={{ marginTop: "10px" }}>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#FF8A80" }}>
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>Day</TableCell>
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>Meal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(menu).map((day, index) => (
                  <TableRow key={index}>
                    <TableCell>{day}</TableCell>
                    <TableCell>{menuData[index] || "Not Set"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </div>
  );
};

export default FoodMenu;
