import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {
  Box,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddSubcategory() {
  const [subcategory, setSubcategory] = useState("");
  const [category, setCategory] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [status, setStatus] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/category-list`);
        setCategoryData(response.data);
      } catch (error) {
        console.error("Error fetching Categories:", error);
      }
    };

    fetchCategory();
  }, []);

  const addSubcategory = async () => {
    if (!category || !subcategory) {
      alert("Please enter category and subcategory.");
      return;
    }
    const subcategoryData = {
      id: Math.floor(Math.random() * 1000) + 1,
      category: category,
      status: status,
      subcategory: subcategory,
    };
    let result = await fetch(`http://localhost:8080/add-subcategory`, {
      method: "POST",
      body: JSON.stringify(subcategoryData),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    console.log(result);
    alert("Subategory added successfully!");
    navigate("/subcategory");
  };

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          padding: "32px",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5">Add Subcategory</Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          padding: "0 32px",
          backgroundColor: "#fff",
        }}
      >
        <Grid2 container spacing={2}>
          <Grid2>
            <TextField
              required
              fullWidth
              label="Subcategory"
              name="subccategory"
              type="text"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
            />
          </Grid2>

          <Grid2>
            <FormControl sx={{ width: "200px" }}>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category "
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                {categoryData.map((item) => (
                  <MenuItem value={item.category}>{item.category}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2} mt={2}>
          <Grid2>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#5c218b" }}
              onClick={addSubcategory}
            >
              Save
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              sx={{ marginLeft: "10px" }}
              onClick={() => {
                navigate("/subcategory");
              }}
            >
              Cancle
            </Button>
          </Grid2>
        </Grid2>
      </Box>
    </div>
  );
}

export default AddSubcategory;
