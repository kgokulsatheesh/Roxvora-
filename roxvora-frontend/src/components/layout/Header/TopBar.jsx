import React from "react";

import {
  Box,
  Container,
  Typography,
} from "@mui/material";

const TopBar = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#173b36",
        color: "#ffffff",
        py: 0.8,
        textAlign: "center",
      }}
    >
      <Container maxWidth="xl">
        <Typography
          sx={{
            fontSize: {
              xs: "11px",
              sm: "12px",
              md: "13px",
            },
            letterSpacing: "0.5px",
          }}
        >
          Free shipping on orders above ₹999
        </Typography>
      </Container>
    </Box>
  );
};

export default TopBar;