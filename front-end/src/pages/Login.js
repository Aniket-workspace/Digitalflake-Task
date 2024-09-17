import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import logo from "../assets/image.png";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/home");
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let result = await fetch(`http://localhost:8080/login`, {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.log(result);

      if (result.auth) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.auth));

        navigate("/home");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error fetching users", error);
      alert("Error logging in");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        {/* main container */}
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "25px",
            boxShadow: "0px 0px 10px #cecece",
          }}
        >
          {/* icon */}
          <Box>
            <img src={logo} width={120} />
          </Box>

          {/* Title */}
          <Typography variant="body2">Welcome to DigitalFlake Admin</Typography>

          {/* main form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {/* user id */}
            <TextField
              margin="normal"
              required
              fullWidth
              autoFocus
              type="text"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              color="secondary"
            />

            {/* password */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              color="secondary"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {/* show password */}
                      {showPassword ? (
                        <VisibilityOffIcon color="secondary" />
                      ) : (
                        <VisibilityIcon color="secondary" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* sig in button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* forgot password */}
              <Grid item xs>
                <Link href="#" variant="body2" color="secondary">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Login;
