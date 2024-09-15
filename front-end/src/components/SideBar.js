import React from "react";
import List from "@mui/material/List";
import {
  Box,
  Grid2,
  ListItem,
  ListItemButton,
  Avatar,
  Typography,
  Grid,
} from "@mui/material";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Companylogo from "../assets/TransLogo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import ViewList from "@mui/icons-material/ViewList";
import CategoryIcon from "@mui/icons-material/Category";
import LayersIcon from "@mui/icons-material/Layers";
import Swal from "sweetalert2";
import Login from "../pages/Login";

function SideBar({ children }) {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const navStyle = {
    textDecoration: "none",
    color: "black",
    width: "200px",
  };
  return (
    <div>
      <Box>
        <Grid2 container>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignContent={"center"}
            sx={{ backgroundColor: "#5c218b", width: "100%" }}
          >
            <Box mt={1.5} ml={2}>
              <img src={Companylogo} style={{ width: "200px" }}></img>
            </Box>
            <Box>
              {user ? (
                <ListItemButton
                  onClick={() =>
                    Swal.fire({
                      title: "Logout",
                      text: "Are you sure you want to Logout?",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#662671",
                      confirmButtonText: "Confirm",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        logout();
                      }
                    })
                  }
                >
                  <Avatar sx={{ backgroundColor: "white" }}>
                    <AccountCircleIcon
                      fontSize="large"
                      sx={{ color: "#5c218b" }}
                    />
                  </Avatar>
                </ListItemButton>
              ) : (
                ""
              )}
            </Box>
          </Box>
        </Grid2>

        {user ? (
          <Grid2 container spacing={2} height={"100vh"}>
            <Grid2 size={2.3} sx={{ backgroundColor: "#f5f5f5" }}>
              <List>
                <ListItem>
                  <NavLink to="/home" style={navStyle}>
                    <ListItemButton>
                      <HomeIcon />
                      <Typography ml={2}>Home</Typography>
                    </ListItemButton>
                  </NavLink>
                </ListItem>

                <ListItem>
                  <NavLink to="/category" style={navStyle}>
                    <ListItemButton>
                      <CategoryIcon />
                      <Typography ml={2}>Category</Typography>
                    </ListItemButton>
                  </NavLink>
                </ListItem>

                <ListItem>
                  <NavLink to="/subcategory" style={navStyle}>
                    <ListItemButton>
                      <ViewList />
                      <Typography ml={2}>Subcategory</Typography>
                    </ListItemButton>
                  </NavLink>
                </ListItem>

                <ListItem>
                  <NavLink to="/products" style={navStyle}>
                    <ListItemButton>
                      <LayersIcon />
                      <Typography ml={2}>Products</Typography>
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              </List>
            </Grid2>

            <Grid2 size={9}>
              <Box>{children}</Box>
            </Grid2>
          </Grid2>
        ) : (
          <Login />
        )}
      </Box>
    </div>
  );
}

export default SideBar;
