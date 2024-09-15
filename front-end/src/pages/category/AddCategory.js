import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Box, Grid2, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AddCategory() {
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  const convertToBase64 = (e) => {
    console.log(e);
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const addCategory = async () => {
    if (!category || !image) {
      alert("Please enter category and Upload image.");
      return;
    }
    const categoryData = {
      id: Math.floor(Math.random() * 1000) + 1,
      category: category,
      image: image,
      status: status,
    };
    let result = await fetch(`http://localhost:8080/add-category`, {
      method: "POST",
      body: JSON.stringify(categoryData),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    console.log(result);
    alert("Category added successfully!");
    navigate("/category");
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
        <Typography variant="h5">Add Category</Typography>
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
              label="Category"
              name="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Grid2>

          <Grid2>
            <TextField
              required
              fullWidth
              name="image"
              type="file"
              //   value={image}
              onChange={convertToBase64}
            />
          </Grid2>

          {image == "" || image == null ? (
            ""
          ) : (
            <Grid2 xs={12} sx={{ padding: "10px", border: "1px solid grey" }}>
              <img src={image} height={100} width={100} />
            </Grid2>
          )}
        </Grid2>

        <Grid2 xs={12} pt={2}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#5c218b" }}
            onClick={addCategory}
          >
            Save
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            sx={{ marginLeft: "10px" }}
            onClick={() => {
              navigate("/category");
            }}
          >
            Cancle
          </Button>
        </Grid2>
      </Box>
    </div>
  );
}

export default AddCategory;
