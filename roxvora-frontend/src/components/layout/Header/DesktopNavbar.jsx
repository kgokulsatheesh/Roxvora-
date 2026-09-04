import React, { useState } from "react";

import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import {
  Search,
  FavoriteBorder,
  ShoppingBagOutlined,
  PersonOutline,
  KeyboardArrowDown,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

const DesktopNavbar = () => {
  const navigate = useNavigate();

  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [shopAnchor, setShopAnchor] = useState(null);

  if (!isDesktop) {
    return null;
  }

  const handleShopOpen = (event) => {
    setShopAnchor(event.currentTarget);
  };

  const handleShopClose = () => {
    setShopAnchor(null);
  };

  const goTo = (path) => {
    navigate(path);
    handleShopClose();
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        color: "#173b36",
        borderBottom: "1px solid #eeeeee",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: {
              md: 72,
              lg: 76,
              xl: 80,
            },

            display: "flex",
            alignItems: "center",
          }}
        >

          {/* =========================
              LOGO
          ========================= */}

          <Box
            onClick={() => goTo("/")}
            sx={{
              cursor: "pointer",
              mr: {
                md: 3,
                lg: 5,
              },

              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  md: "23px",
                  lg: "27px",
                  xl: "29px",
                },

                fontWeight: 800,

                letterSpacing: "2px",

                color: "#173b36",
              }}
            >
              ROXVORA
            </Typography>
          </Box>

          {/* =========================
              NAVIGATION
          ========================= */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",

              gap: {
                md: 0.2,
                lg: 0.7,
                xl: 1,
              },

              flex: 1,
            }}
          >

            {/* HOME */}

            <Button
              onClick={() => goTo("/")}
              sx={{
                color: "#173b36",
                textTransform: "none",

                fontSize: {
                  md: "13px",
                  lg: "15px",
                  xl: "16px",
                },

                fontWeight: 500,

                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#b08d57",
                },
              }}
            >
              Home
            </Button>

            {/* SHOP */}

            <Button
              onClick={handleShopOpen}
              endIcon={
                <KeyboardArrowDown
                  sx={{
                    fontSize: "18px !important",
                  }}
                />
              }
              sx={{
                color: "#173b36",
                textTransform: "none",

                fontSize: {
                  md: "13px",
                  lg: "15px",
                  xl: "16px",
                },

                fontWeight: 500,

                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#b08d57",
                },
              }}
            >
              Shop
            </Button>

            {/* SHOP DROPDOWN */}

            <Menu
              anchorEl={shopAnchor}
              open={Boolean(shopAnchor)}
              onClose={handleShopClose}
              PaperProps={{
                sx: {
                  mt: 1,
                  minWidth: 210,

                  borderRadius: 1,

                  border: "1px solid #eeeeee",

                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.10)",
                },
              }}
            >

              <MenuItem
                onClick={() => goTo("/shop")}
              >
                All Products
              </MenuItem>

              <MenuItem
                onClick={() => goTo("/shop/men")}
              >
                Men
              </MenuItem>

              <MenuItem
                onClick={() => goTo("/shop/women")}
              >
                Women
              </MenuItem>

              <MenuItem
                onClick={() => goTo("/shop/kids")}
              >
                Kids
              </MenuItem>

              <MenuItem
                onClick={() => goTo("/shop/accessories")}
              >
                Accessories
              </MenuItem>

            </Menu>

            {/* NEW ARRIVALS */}

            <Button
              onClick={() => goTo("/new-arrivals")}
              sx={navButtonStyle}
            >
              New Arrivals
            </Button>

            {/* BEST SELLERS */}

            <Button
              onClick={() => goTo("/best-sellers")}
              sx={navButtonStyle}
            >
              Best Sellers
            </Button>

            {/* COLLECTIONS */}

            <Button
              onClick={() => goTo("/collections")}
              sx={navButtonStyle}
            >
              Collections
            </Button>

            {/* OFFERS */}

            <Button
              onClick={() => goTo("/offers")}
              sx={{
                ...navButtonStyle,

                color: "#b08d57",
              }}
            >
              Offers
            </Button>

          </Box>

          {/* =========================
              RIGHT SIDE
          ========================= */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.3,
            }}
          >

            {/* SEARCH */}

            <IconButton
              onClick={() => goTo("/search")}
              sx={iconButtonStyle}
            >
              <Search />
            </IconButton>

            {/* WISHLIST */}

            <IconButton
              onClick={() => goTo("/wishlist")}
              sx={iconButtonStyle}
            >
              <FavoriteBorder />
            </IconButton>

            {/* CART */}

            <IconButton
              onClick={() => goTo("/cart")}
              sx={iconButtonStyle}
            >
              <Badge
                badgeContent={2}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#b08d57",
                    color: "#ffffff",
                    fontSize: "10px",
                    minWidth: 17,
                    height: 17,
                  },
                }}
              >
                <ShoppingBagOutlined />
              </Badge>
            </IconButton>

            <Divider
              orientation="vertical"
              flexItem
              sx={{
                height: 24,
                mx: 1,
              }}
            />

            {/* ACCOUNT */}

            <Button
              startIcon={<PersonOutline />}
              onClick={() => goTo("/account")}
              sx={{
                color: "#173b36",

                textTransform: "none",

                fontSize: {
                  md: "13px",
                  lg: "15px",
                  xl: "16px",
                },

                fontWeight: 500,

                whiteSpace: "nowrap",

                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#b08d57",
                },
              }}
            >
              Account
            </Button>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};


/* =========================
   NAV BUTTON STYLE
========================= */

const navButtonStyle = {
  color: "#173b36",

  textTransform: "none",

  fontSize: {
    md: "13px",
    lg: "15px",
    xl: "16px",
  },

  fontWeight: 500,

  whiteSpace: "nowrap",

  "&:hover": {
    backgroundColor: "transparent",
    color: "#b08d57",
  },
};


/* =========================
   ICON STYLE
========================= */

const iconButtonStyle = {
  color: "#173b36",

  "&:hover": {
    backgroundColor: "transparent",
    color: "#b08d57",
  },
};

export default DesktopNavbar;