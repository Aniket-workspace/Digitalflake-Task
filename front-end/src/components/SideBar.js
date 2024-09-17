import React, { useState } from "react";
import List from "@mui/material/List";
import {
  Box,
  ListItem,
  ListItemButton,
  Avatar,
  Typography,
  Grid,
  IconButton,
  AppBar,
  Toolbar,
  Drawer,
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
import MenuIcon from "@mui/icons-material/Menu";

function SideBar({ children }) {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const navStyle = {
    textDecoration: "none",
    color: "black",
    width: "200px",
  };

  const drawewr = (
    <Box onClick={drawerToggle} sx={{ textAlign: "center" }}>
      <List>
        <ListItem>
          <IconButton
            sx={{
              padding: "10px",
              backgroundColor: "secondary.main",
              borderRadius: 0,
            }}
          >
            <img src={Companylogo} style={{ width: "150px" }}></img>
          </IconButton>
        </ListItem>

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
    </Box>
  );
  return (
    <div>
      <Box>
        <AppBar position="static" sx={{ boxShadow: "none" }} color="secondary">
          <Toolbar>
            {user ? (
              <IconButton
                aria-label="open drawer"
                edge="start"
                sx={{
                  color: "white",
                  display: { xs: "bolck", md: "none" },
                }}
                onClick={drawerToggle}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              ""
            )}
            <IconButton>
              <img src={Companylogo} style={{ width: "200px" }}></img>
            </IconButton>
            {user ? (
              <IconButton
                sx={{ p: 0, marginLeft: "auto" }}
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
                  <AccountCircleIcon color="secondary" fontSize="large" />
                </Avatar>
              </IconButton>
            ) : (
              ""
            )}
          </Toolbar>
        </AppBar>

        {/* mobile nav */}
        <Box component={"nav"}>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={drawerToggle}
            sx={{
              display: { xs: "block", lg: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "200px",
                backgroundColor: "#f3f3f3",
              },
            }}
          >
            {drawewr}
          </Drawer>
        </Box>

        {user ? (
          <Grid container spacing={2} height={"100vh"} mt={0.1}>
            <Grid
              md={2.3}
              ml={2}
              sx={{
                backgroundColor: "#f5f5f5",
                display: { xs: "none", md: "block" },
              }}
            >
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
            </Grid>

            <Grid md={9} xs={12}>
              <Box>{children}</Box>
            </Grid>
          </Grid>
        ) : (
          <Login />
        )}
      </Box>
    </div>
  );
}

export default SideBar;
