import React, { useEffect, useState } from "react";
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
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import axios from "axios";
import CategoryIcon from "@mui/icons-material/Category";

const CategoryList = () => {
  // update batch.................
  const [Id, setId] = useState("");
  const [Category, setCategory] = useState("");
  const [Image, setImage] = useState("");
  const [Status, setStatus] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [categoryData, setCategoryData] = useState([]);
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

  // update batch.............................
  // const handleOpen = async (catId) => {
  //   setCategoryModalOpen(true);
  //   let result = await fetch(`http://localhost:8080/alldata/${catId}`);
  //   // let result = await fetch(`${window.location.origin}/update-batch/${Id}`);
  //   result = await result.json();
  //   setCategory(result.category);
  //   setImage(result.image);
  //   setStatus(result.status);

  //   console.log(result.category);
  // };

  const handleClose = () => {
    setCategoryModalOpen(false);
  };

  const handleOpen = async (catId) => {
    setCategoryModalOpen(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/get-category/${catId}`
      );
      let result = response.data[0];
      // SetUpdateCategoryData(response.data);
      setCategory(result.category);
      setImage(result.image);
      setStatus(result.status);
      setId(catId);
      console.log(result.category);
    } catch (error) {
      console.error("Error fetching Categories:", error);
    }
  };

  const updateCategory = async () => {
    let data = {
      category: Category,
      image: Image,
      status: Status,
    };
    let result = await fetch(
      `http://localhost:8080/update-category/${Id}`,
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
    setCategoryModalOpen(false);
    alert("Data Successfully updated");

    navigate("/category");
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
      let result = await fetch(`http://localhost:8080/delete-category/${id}`, {
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

  //

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
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
          <CategoryIcon />
          <Typography variant="h5" fontWeight={600}>
            Category
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
            to="/add-category"
          >
            Add New
          </Button>
        </Box>

        <Box sx={{ height: 700, width: "100%" }}>
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
                    <b>Category</b>
                  </TableCell>

                  <TableCell align="center">
                    <b>Image</b>
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
                {categoryData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell align="center">{item.id}</TableCell>
                    <TableCell align="center">{item.category}</TableCell>
                    <TableCell align="center">
                      <img src={item.image} height={70} width={70} />
                    </TableCell>

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
        open={categoryModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid2 container spacing={2}>
            <Grid2 item xs={12} md={6}>
              <TextField
                required
                label="Category"
                name="category"
                type="text"
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Grid2>

            <Grid2 item xs={12}>
              <FormControl>
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
                label="Image"
                name="image"
                type="file"
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

            <Grid2 item xs={12} mt={11}>
              <Button
                type="submit"
                onClick={updateCategory}
                variant="contained"
                color="secondary"
              >
                Update
              </Button>

              <Button
                onClick={handleClose}
                variant="contained"
                color="secondary"
                sx={{ marginLeft: "10px" }}
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

export default CategoryList;
