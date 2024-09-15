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
  Grid2,
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
  const [subcategoryData, setSubcategoryData] = useState([]);

  const [product, setProduct] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [Id, setId] = useState("");
  const [Category, setCategory] = useState("");
  const [Image, setImage] = useState("");
  const [Status, setStatus] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);

  useEffect(() => {
    const fetchSubcategory = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/product-list`);
        setSubcategoryData(response.data);
      } catch (error) {
        console.error("Error fetching Categories:", error);
      }
    };

    fetchSubcategory();
  }, []);

  const handleClose = () => {
    setProductModalOpen(false);
  };

  const handleOpen = async (catId) => {
    setProductModalOpen(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/get-product/${catId}`
      );
      let result = response.data[0];
      // SetUpdateCategoryData(response.data);
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
    let result = await fetch(
      `http://localhost:8080/update-product/${Id}`,
      // `${window.location.origin}/update-batch/${batchObjectId}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    console.log(result);
    setProductModalOpen(false);
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
      });
      result = await result.json();
      if (result) {
        alert("Category Deleted");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          padding: "32px",
          backgroundColor: "#fff",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <LayersIcon />
          <Typography variant="h5" fontWeight={600}>
            Products
          </Typography>
          <Box sx={{ flexGrow: 1, ml: 4 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #B0ADAD",
                borderRadius: 1,
                width: 500,
                px: 2,
              }}
            >
              <SearchIcon />
              <TextField
                variant="standard"
                placeholder="Search..."
                fullWidth
                InputProps={{ disableUnderline: true }}
                sx={{ ml: 2 }}
              />
            </Box>
          </Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#662671",
              color: "#FFF",
              borderRadius: 1,
              ml: 2,
              "&:hover": { backgroundColor: "#552261" },
            }}
            component={Link}
            to="/add-product"
          >
            Add New
          </Button>
        </Box>

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
                {subcategoryData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell align="center">{item.id}</TableCell>
                    <TableCell align="center">{item.product}</TableCell>
                    <TableCell align="center">
                      <img src={item.image} height={70} width={70} />
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
          <Grid2 container spacing={2}>
            <Grid2 item xs={12} md={6}>
              <TextField
                required
                sx={{ width: "190px" }}
                label="Product Name"
                name="product"
                type="text"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
            </Grid2>

            <Grid2 xs={12} md={6}>
              <FormControl sx={{ width: "190px" }}>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category "
                  value={Category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  required
                >
                  {subcategoryData.map((item) => (
                    <MenuItem value={item.category}>{item.category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>

            <Grid2 xs={12} md={6}>
              <FormControl sx={{ width: "190px" }}>
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

            <Grid2 item xs={12}>
              <FormControl sx={{ width: "190px" }}>
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
            </Grid2>

            <Grid2 item xs={12} md={6}>
              <TextField
                required
                fullWidth
                name="image"
                type="file"
                sx={{ width: "400px" }}
                // value={null}
                onChange={convertToBase64}
              />
            </Grid2>

            <Grid2
              item
              xs={12}
              md={6}
              sx={{ padding: "10px", border: "1px solid grey" }}
            >
              <img src={Image} width={100} height={100} />
            </Grid2>

            <Grid2 item xs={12} mt={11} ml={8}>
              <Button
                type="submit"
                onClick={updateProduct}
                color="secondary"
                variant="contained"
              >
                Update
              </Button>

              <Button
                onClick={handleClose}
                color="secondary"
                sx={{ marginLeft: "10px" }}
                variant="contained"
              >
                Cancle
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProductList;
