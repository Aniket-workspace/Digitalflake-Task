import { Box, Typography } from "@mui/material";
import React from "react";
import logo from "../assets/image.png";

function Home() {
  return (
    <div>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
        height={"100vh"}
      >
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "25px",
          }}
        >
          <img src={logo} width={150} />
          <Typography variant="body2">Welcome to DigitalFlake Admin</Typography>
        </Box>
      </Box>
    </div>
  );
}

export default Home;
