import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  IconButton,
  Typography,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  Modal,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import LayersIcon from "@mui/icons-material/Layers";

const ProductList = () => {
  const [productData, setProductData] = useState([]);

  const [product, setProduct] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [Id, setId] = useState("");
  const [Category, setCategory] = useState("");
  const [Image, setImage] = useState("");
  const [Status, setStatus] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  // get
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/product-list`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      setProductData(response.data);
    } catch (error) {
      console.error("Error fetching Categories:", error);
    }
  };

  const handleClose = () => {
    setProductModalOpen(false);
  };

  const handleOpen = async (catId) => {
    setProductModalOpen(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/get-product/${catId}`,
        {
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      let result = response.data[0];
      setCategory(result.category);
      setImage(result.image);
      setStatus(result.status);
      setId(catId);
      setSubcategory(result.subcategory);
      setProduct(result.product);
      console.log(result.category);
    } catch (error) {
      console.error("Error fetching Categories:", error);
    }
  };

  const updateProduct = async () => {
    let data = {
      category: Category,
      image: Image,
      status: Status,
      subcategory: subcategory,
      product: product,
    };
    let result = await fetch(`http://localhost:8080/update-product/${Id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    setProductModalOpen(false);
    fetchProducts();
    alert("Data Successfully updated");
  };

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

  // delete

  const deleteCategory = async (id) => {
    console.log(id);
    try {
      let result = await fetch(`http://localhost:8080/delete-product/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        fetchProducts();
        alert("Product Deleted");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // search
  //search
  const searchHandel = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:8080/search-product/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProductData(result);
      }
    } else {
      fetchProducts();
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: 280, md: 400 },
    bgcolor: "background.paper",
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Box>
      <Box
        sx={{
          padding: "32px",
          backgroundColor: "#fff",
        }}
      >
        <Grid container sx={{ mb: 2 }} spacing={2}>
          <Grid item md={3} xs={12}>
            <Box display={"flex"}>
              <LayersIcon />
              <Typography variant="h5" fontWeight={600} ml={1.5}>
                Products
              </Typography>
            </Box>
          </Grid>

          <Grid item md={7} xs={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #B0ADAD",
                borderRadius: 1,
                width: { xs: "90%", md: "500" },
                px: 2,
              }}
            >
              <SearchIcon />
              <TextField
                variant="standard"
                placeholder="Search..."
                fullWidth
                InputProps={{ disableUnderline: true }}
                onChange={searchHandel}
              />
            </Box>
          </Grid>

          <Grid item md={2} xs={12}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                borderRadius: 1,
              }}
              color="secondary"
              component={Link}
              to="/add-product"
            >
              Add New
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ height: 500, width: "100%" }}>
          <TableContainer component={Paper} sx={{ textAlign: "center" }}>
            <Table
              sx={{ textAlign: "center" }}
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow sx={{ backgroundColor: "red" }}>
                  <TableCell align="center">
                    <b>ID</b>
                  </TableCell>

                  <TableCell align="center">
                    <b>Product Name</b>
                  </TableCell>

                  <TableCell align="center">
                    <b>Image</b>
                  </TableCell>

                  <TableCell align="center">
                    <b>Subcategory</b>
                  </TableCell>

                  <TableCell align="center">
                    <b>Category</b>
                  </TableCell>

                  <TableCell align="center">
                    <b>Status</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Action</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell align="center">{item.id}</TableCell>
                    <TableCell align="center">{item.product}</TableCell>
                    <TableCell align="center">
                      <img
                        src={item.image}
                        height={70}
                        width={70}
                        alt="Product image"
                      />
                    </TableCell>
                    <TableCell align="center">{item.subcategory}</TableCell>
                    <TableCell align="center">{item.category}</TableCell>

                    <TableCell align="center">
                      <Typography
                        sx={{
                          color: item.status ? "#2DA323" : "#B13129",
                          fontWeight: 400,
                        }}
                      >
                        {item.status ? "Active" : "Inactive"}
                      </Typography>
                    </TableCell>

                    <TableCell align="center">
                      <Box>
                        <IconButton
                          onClick={() => {
                            handleOpen(item._id);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            Swal.fire({
                              title: "Delete",
                              text: "Are you sure you want to delete?",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#662671",
                              confirmButtonText: "Confirm",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                deleteCategory(item._id);
                              }
                            })
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <Modal
        open={productModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight={600}>
                Update subcategory
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Product Name"
                name="product"
                type="text"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category "
                  value={Category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  required
                >
                  {productData.map((item) => (
                    <MenuItem value={item.category}>{item.category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Subcategory</InputLabel>
                <Select
                  label="Subcategory "
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  required
                >
                  {productData.map((item) => (
                    <MenuItem value={item.subcategory}>
                      {item.subcategory}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Select Status</InputLabel>
                <Select
                  label="Select Batch"
                  value={Status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <MenuItem value="true">Active</MenuItem>
                  <MenuItem value="false">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                name="image"
                type="file"
                // value={null}
                onChange={convertToBase64}
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={5.3}
              sx={{
                padding: "10px",
                border: "1px solid grey",
                margin: "18px 0 0 18px",
              }}
            >
              <img src={Image} width={100} height={100} />
            </Grid>

            <Grid item xs={6}>
              <Button
                fullWidth
                type="submit"
                onClick={updateProduct}
                variant="contained"
                color="secondary"
                size="small"
              >
                Update
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button
                fullWidth
                onClick={handleClose}
                variant="contained"
                color="secondary"
                size="small"
              >
                Cancle
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProductList;
