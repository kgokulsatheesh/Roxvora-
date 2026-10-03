import React from "react";

import {
  Box,
  Button,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";

import {
  Close,
} from "@mui/icons-material";

import PriceFilter from "./PriceFilter";
import SizeFilter from "./SizeFilter";
import ColorFilter from "./ColorFilter";

const FilterDrawer = ({
  open,
  onClose,
  priceRange,
  setPriceRange,
  selectedSizes,
  setSelectedSizes,
  selectedColors,
  setSelectedColors,
  resetFilters,
}) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          width: {
            xs: "88vw",
            sm: 380,
          },
          maxWidth: 420,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            px: 2.5,
            py: 2,
            borderBottom:
              "1px solid #EEE",
          }}
        >
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            Filters
          </Typography>

          <IconButton
            onClick={onClose}
          >
            <Close />
          </IconButton>
        </Box>

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 2.5,
          }}
        >
          <PriceFilter
            value={priceRange}
            onChange={setPriceRange}
          />

          <Box sx={{ my: 4 }}>
            <SizeFilter
              selectedSizes={
                selectedSizes
              }
              setSelectedSizes={
                setSelectedSizes
              }
            />
          </Box>

          <ColorFilter
            selectedColors={
              selectedColors
            }
            setSelectedColors={
              setSelectedColors
            }
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            p: 2,
            borderTop:
              "1px solid #EEE",
          }}
        >
          <Button
            fullWidth
            onClick={resetFilters}
            sx={{
              height: 48,
              border:
                "1px solid #DDD",
              color: "#111",
              borderRadius: "10px",
            }}
          >
            Clear
          </Button>

          <Button
            fullWidth
            onClick={onClose}
            sx={{
              height: 48,
              background: "#111",
              color: "#fff",
              borderRadius: "10px",
              "&:hover": {
                background: "#333",
              },
            }}
          >
            Apply
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default FilterDrawer;