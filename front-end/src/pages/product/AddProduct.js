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

function AddProduct() {
  const [product, setProduct] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [category, setCategory] = useState("");
  const [subcategoryData, setsubCategoryData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/subcategory-list`
        );
        setsubCategoryData(response.data);
        setCategoryData(response.data.category);
        console.log("array: ", response.data);
      } catch (error) {
        console.error("Error fetching Categories:", error);
      }
    };

    fetchCategory();
  }, []);

  const addProduct = async () => {
    if (!category || !subcategory || !product) {
      alert("Please enter category, subcategory and product.");
      return;
    }
    const productData = {
      id: Math.floor(Math.random() * 1000) + 1,
      category: category,
      status: status,
      subcategory: subcategory,
      product: product,
    };
    let result = await fetch(`http://localhost:8080/add-product`, {
      method: "POST",
      body: JSON.stringify(productData),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    console.log(result);
    alert("Product added successfully!");
    navigate("/products");
  };

  const filteredSubcategory = selectedCategory
    ? subcategoryData.filter((item) => item.category === selectedCategory)
    : subcategoryData;

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          padding: "32px",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5">Add Product</Typography>
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
              label="Product Name"
              name="product"
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
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
                {subcategoryData.map((item) => (
                  <MenuItem value={item.category}>{item.category}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>

          <Grid2>
            <FormControl sx={{ width: "200px" }}>
              <InputLabel>Subcategory</InputLabel>
              <Select
                label="Subcategory "
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                required
              >
                {subcategoryData.map((item) => (
                  <MenuItem value={item.subcategory}>
                    {item.subcategory}
                  </MenuItem>
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
              onClick={addProduct}
            >
              Save
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              sx={{ marginLeft: "10px" }}
              onClick={() => {
                navigate("/products");
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

export default AddProduct;
