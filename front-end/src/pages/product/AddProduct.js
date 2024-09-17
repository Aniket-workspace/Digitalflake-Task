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

function AddProduct() {
  const [product, setProduct] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [category, setCategory] = useState("");
  const [subcategoryData, setsubCategoryData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/subcategory-list`,
          {
            headers: {
              authorization: `bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
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
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    alert("Product added successfully!");
    navigate("/products");
  };

  return (
    <div>
      <Box
        sx={{
          padding: "32px",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Add Product
        </Typography>
      </Box>

      <Box
        sx={{
          padding: "0 32px",
          backgroundColor: "#fff",
        }}
      >
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <TextField
              required
              fullWidth
              label="Product Name"
              name="product"
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </Grid>

          <Grid item md={4} xs={12}>
            <FormControl fullWidth>
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
          </Grid>

          <Grid item md={4} xs={12}>
            <FormControl fullWidth>
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
          </Grid>

          <Grid item md={6} xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={addProduct}
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
                navigate("/products");
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

export default AddProduct;
