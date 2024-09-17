import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {
  Box,
  FormControl,
  Grid,
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
        const response = await axios.get(
          `http://localhost:8080/category-list`,
          {
            headers: {
              authorization: `bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        );
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
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    alert("Subategory added successfully!");
    navigate("/subcategory");
  };

  return (
    <div>
      <Box>
        <Box
          sx={{
            padding: "32px",
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            Add Subcategory
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          padding: "0 32px",
          backgroundColor: "#fff",
        }}
      >
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <TextField
              required
              fullWidth
              label="Subcategory"
              name="subccategory"
              type="text"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
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
          </Grid>

          <Grid item md={6} xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={addSubcategory}
            >
              Save
            </Button>
          </Grid>

          <Grid item md={6} xs={12}>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={() => {
                navigate("/subcategory");
              }}
            >
              Cancle
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default AddSubcategory;
