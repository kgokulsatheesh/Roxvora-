import React, { useState } from "react";

import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  IconButton,
  Badge,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import {
  Menu as MenuIcon,
  Search,
  ShoppingBagOutlined,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import SearchDrawer from "./SearchDrawer";
import CategoryMenu from "./CategoryMenu";

const MobileNavbar = () => {
  const navigate = useNavigate();

  const theme = useTheme();

  const isMobile = useMediaQuery(
    theme.breakpoints.down("md")
  );

  const [menuOpen, setMenuOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);

  if (!isMobile) {
    return null;
  }

  return (
    <>
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
                xs: 64,
                sm: 70,
              },

              display: "flex",
              justifyContent: "space-between",
            }}
          >

            {/* LEFT */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={() => setMenuOpen(true)}
                sx={{
                  color: "#173b36",
                  mr: 1,
                }}
              >
                <MenuIcon />
              </IconButton>

              {/* LOGO */}

              <Typography
                onClick={() => navigate("/")}
                sx={{
                  cursor: "pointer",

                  fontSize: {
                    xs: "20px",
                    sm: "23px",
                  },

                  fontWeight: 800,

                  letterSpacing: "1.5px",

                  color: "#173b36",
                }}
              >
                ROXVORA
              </Typography>
            </Box>

            {/* RIGHT */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >

              {/* SEARCH */}

              <IconButton
                onClick={() => setSearchOpen(true)}
                sx={{
                  color: "#173b36",
                }}
              >
                <Search />
              </IconButton>

              {/* CART */}

              <IconButton
                onClick={() => navigate("/cart")}
                sx={{
                  color: "#173b36",
                }}
              >
                <Badge
                  badgeContent={2}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#b08d57",
                      color: "#ffffff",
                      fontSize: "10px",
                    },
                  }}
                >
                  <ShoppingBagOutlined />
                </Badge>
              </IconButton>

            </Box>

          </Toolbar>
        </Container>
      </AppBar>

      {/* MOBILE CATEGORY MENU */}

      <CategoryMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      {/* SEARCH DRAWER */}

      <SearchDrawer
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
};

export default MobileNavbar;