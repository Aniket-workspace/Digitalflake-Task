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
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
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
    fetchCategory();
  }, []);

  // get
  const fetchCategory = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/category-list`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      setCategoryData(response.data);
    } catch (error) {
      console.error("Error fetching Categories:", error);
    }
  };

  const handleClose = () => {
    setCategoryModalOpen(false);
  };

  const handleOpen = async (catId) => {
    setCategoryModalOpen(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/get-category/${catId}`,
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
      console.log(result.category);
    } catch (error) {
      console.error("Error fetching Categories:", error);
    }
  };

  // update

  const updateCategory = async () => {
    let data = {
      category: Category,
      image: Image,
      status: Status,
    };
    let result = await fetch(`http://localhost:8080/update-category/${Id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    setCategoryModalOpen(false);
    fetchCategory();
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
      let result = await fetch(`http://localhost:8080/delete-category/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        fetchCategory();
        alert("Category Deleted");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //search
  const searchHandel = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:8080/search-category/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setCategoryData(result);
      }
    } else {
      fetchCategory();
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
          padding: "30px",
          backgroundColor: "#fff",
        }}
      >
        <Grid container sx={{ mb: 2 }} spacing={2}>
          <Grid item md={3} xs={12}>
            <Box display={"flex"}>
              <CategoryIcon />
              <Typography variant="h5" fontWeight={600} ml={1.5}>
                Category
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
              to="/add-category"
            >
              Add New
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ height: "100vh" }}>
          <TableContainer component={Paper} sx={{ textAlign: "center" }}>
            <Table
              sx={{ textAlign: "center" }}
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "red",
                  }}
                >
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
                      <img
                        src={item.image}
                        height={50}
                        width={50}
                        alt="Category image"
                      />
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight={600}>
                Update category
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Category"
                name="category"
                type="text"
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
              />
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
              {/* <FormControl fullWidth> */}
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
                onClick={updateCategory}
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

export default CategoryList;
