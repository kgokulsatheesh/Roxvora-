// src/components/layout/Header/SearchDrawer.jsx`

// ```jsx
import React from "react";

import {
  Drawer,
  Box,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";

import {
  Close,
  Search,
} from "@mui/icons-material";

const SearchDrawer = ({
  open,
  onClose,
}) => {
  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          p: 2,

          display: "flex",
          alignItems: "center",

          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            color: "#173b36",
          }}
        >
          Search
        </Typography>

        <TextField
          fullWidth
          autoFocus
          placeholder="Search products..."
          size="small"

          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        <IconButton
          onClick={onClose}
        >
          <Close />
        </IconButton>
      </Box>
    </Drawer>
  );
};

export default SearchDrawer;