import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Box, Grid, TextField, Typography } from "@mui/material";
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
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    alert("Category added successfully!");
    navigate("/category");
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
            Add Category
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            padding: "0 32px",
            backgroundColor: "#fff",
          }}
        >
          <Grid container spacing={2}>
            <Grid item md={4} xs={12}>
              <TextField
                required
                fullWidth
                label="Category"
                name="category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Grid>

            <Grid item md={4} xs={12}>
              <TextField
                required
                fullWidth
                name="image"
                type="file"
                //   value={image}
                onChange={convertToBase64}
              />
            </Grid>

            {image == "" || image == null ? (
              ""
            ) : (
              <Grid
                item
                md={3.7}
                xs={12}
                sx={{
                  padding: "10px",
                  border: "1px solid grey",
                  margin: "18px 0 0 18px",
                }}
              >
                <img src={image} height={100} width={100} />
              </Grid>
            )}

            <Grid item md={6} xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={addCategory}
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
                  navigate("/category");
                }}
              >
                Cancle
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default AddCategory;
