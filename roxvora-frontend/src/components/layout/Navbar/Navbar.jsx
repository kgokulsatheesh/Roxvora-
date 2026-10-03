import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

import {
  Search,
  FavoriteBorder,
  ShoppingBagOutlined,
  Person,
  Menu as MenuIcon,
  Close,
  HomeOutlined,
  StorefrontOutlined,
  CreditCardOutlined,
  SupportAgentOutlined,
} from "@mui/icons-material";

import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Badge,
  Divider,
  useMediaQuery,
} from "@mui/material";

/* =========================================================
   ROXVORA NAVBAR
   React.jsx + MUI

   Responsive:
   Mobile
   Tablet
   Laptop
   Desktop
========================================================= */

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();

  const [drawerOpen, setDrawerOpen] = useState(false);

  /* =========================================================
     RESPONSIVE BREAKPOINTS
  ========================================================= */

  const mobile = useMediaQuery("(max-width:599px)");

  const tablet = useMediaQuery(
    "(min-width:600px) and (max-width:959px)"
  );

  const laptop = useMediaQuery(
    "(min-width:960px) and (max-width:1199px)"
  );

  const desktop = useMediaQuery("(min-width:1200px)");

  /* =========================================================
     COLORS
  ========================================================= */

  const colors = {
    black: "#111111",
    white: "#FFFFFF",
    background: "#FAF9F6",
    border: "#E8E5DF",
    muted: "#777777",
    hover: "#F3F1EC",
  };

  /* =========================================================
     NAVIGATION DATA
  ========================================================= */

  const navItems = [
    {
      label: "Home",
      path: "/",
      icon: <HomeOutlined />,
    },
    {
      label: "Shop / Product Listing",
      path: "/shop",
      icon: <StorefrontOutlined />,
    },
    {
      label: "Cart",
      path: "/bag",
      icon: <ShoppingBagOutlined />,
    },
    {
      label: "Checkout",
      path: "/checkout",
      icon: <CreditCardOutlined />,
    },
    {
      label: "Customer Account",
      path: "/account",
      icon: <Person />,
    },
    {
      label: "Wishlist",
      path: "/wishlist",
      icon: <FavoriteBorder />,
    },
    {
      label: "Contact & Support",
      path: "/contact",
      icon: <SupportAgentOutlined />,
    },
    {
      label: "Search",
      path: "/search",
      icon: <Search />,
    },
  ];

  /* =========================================================
     NAVIGATION FUNCTION
  ========================================================= */

  const goTo = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  /* =========================================================
     ACTIVE PAGE
  ========================================================= */

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  /* =========================================================
     DESKTOP NAV ITEM
  ========================================================= */

  const DesktopNavItem = ({ item }) => {
    const active = isActive(item.path);

    return (
      <Button
        component={Link}
        to={item.path}
        color="inherit"
        sx={{
          position: "relative",

          minWidth: "auto",

          px: {
            md: 1.2,
            lg: 1.4,
          },

          py: 1,

          color: colors.black,

          fontSize: {
            md: "12px",
            lg: "13px",
            xl: "13px",
          },

          fontWeight: active ? 700 : 500,

          textTransform: "none",

          letterSpacing: "0.1px",

          whiteSpace: "nowrap",

          borderRadius: 0,

          "&:hover": {
            backgroundColor: "transparent",
            color: "#555555",
          },

          "&::after": {
            content: '""',

            position: "absolute",

            left: "50%",

            bottom: 3,

            width: active ? "65%" : "0%",

            height: "1.5px",

            backgroundColor: colors.black,

            transform: "translateX(-50%)",

            transition: "width 0.25s ease",
          },

          "&:hover::after": {
            width: "65%",
          },
        }}
      >
        {item.label}
      </Button>
    );
  };

  /* =========================================================
     ICON BUTTON
  ========================================================= */

  const ActionIcon = ({
    label,
    icon,
    path,
    badge,
  }) => {
    const active = isActive(path);

    return (
      <IconButton
        onClick={() => goTo(path)}
        aria-label={label}
        sx={{
          width: {
            xs: 38,
            sm: 40,
            md: 42,
          },

          height: {
            xs: 38,
            sm: 40,
            md: 42,
          },

          color: colors.black,

          borderRadius: "50%",

          backgroundColor: active
            ? colors.hover
            : "transparent",

          transition: "all 0.2s ease",

          "&:hover": {
            backgroundColor: colors.hover,
          },

          "& svg": {
            fontSize: {
              xs: 20,
              sm: 21,
              md: 22,
            },
          },
        }}
      >
        {badge ? (
          <Badge
            badgeContent={badge}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: colors.black,
                color: colors.white,
                fontSize: "9px",
                minWidth: 17,
                height: 17,
                padding: 0,
              },
            }}
          >
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    );
  };

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <>
      {/* =====================================================
          ANNOUNCEMENT BAR
      ===================================================== */}

      <Box
        sx={{
          width: "100%",

          backgroundColor: colors.black,

          color: colors.white,

          textAlign: "center",

          py: {
            xs: 0.8,
            sm: 0.9,
            md: 1,
          },

          px: 2,

          minHeight: {
            xs: 31,
            sm: 33,
            md: 35,
          },

          display: "flex",

          alignItems: "center",

          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: "8px",
              sm: "9px",
              md: "10px",
              lg: "11px",
            },

            fontWeight: 600,

            letterSpacing: {
              xs: "1px",
              sm: "1.4px",
              md: "1.7px",
            },

            lineHeight: 1,

            whiteSpace: "nowrap",
          }}
        >
          FREE SHIPPING ON ORDERS ABOVE ₹999
        </Typography>
      </Box>

      {/* =====================================================
          MAIN NAVBAR
      ===================================================== */}

      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          top: 0,

          backgroundColor: colors.background,

          color: colors.black,

          borderBottom: `1px solid ${colors.border}`,

          zIndex: 1100,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            width: "100%",

            minHeight: {
              xs: 64,
              sm: 68,
              md: 72,
              lg: 76,
            },

            px: {
              xs: 1.5,
              sm: 2.5,
              md: 3,
              lg: 4,
              xl: 5,
            },

            display: "flex",

            alignItems: "center",
          }}
        >
          {/* =================================================
              MOBILE / TABLET / LAPTOP MENU
          ================================================= */}

          {!desktop && (
            <IconButton
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              sx={{
                mr: {
                  xs: 0.5,
                  sm: 1,
                  md: 1,
                },

                color: colors.black,

                width: 42,

                height: 42,

                "&:hover": {
                  backgroundColor: colors.hover,
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* =================================================
              LOGO
          ================================================= */}

          <Typography
            component={Link}
            to="/"
            onClick={() => setDrawerOpen(false)}
            sx={{
              textDecoration: "none",

              color: colors.black,

              fontFamily:
                '"Times New Roman", Georgia, serif',

              fontSize: {
                xs: "24px",
                sm: "27px",
                md: "30px",
                lg: "32px",
                xl: "34px",
              },

              fontWeight: 700,

              letterSpacing: {
                xs: "2px",
                sm: "2.5px",
                md: "3px",
              },

              lineHeight: 1,

              whiteSpace: "nowrap",

              transition:
                "opacity 0.2s ease",

              "&:hover": {
                opacity: 0.65,
              },
            }}
          >
            ROXVORA
          </Typography>

          {/* =================================================
              DESKTOP NAVIGATION

              Only displayed on large desktop.
          ================================================= */}

          {desktop && (
            <Box
              component="nav"
              sx={{
                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                flex: 1,

                ml: {
                  lg: 3,
                  xl: 5,
                },

                gap: {
                  lg: 0.2,
                  xl: 0.5,
                },
              }}
            >
              {/* Show all primary nav links on desktop */}
              {navItems.map((item) => (
                <DesktopNavItem
                  key={item.path}
                  item={item}
                />
              ))}
            </Box>
          )}

          {/* =================================================
              RIGHT ACTIONS
          ================================================= */}

          <Box
            sx={{
              display: "flex",

              alignItems: "center",

              ml: "auto",

              gap: {
                xs: 0,
                sm: 0.2,
                md: 0.3,
              },
            }}
          >
            {/* Search */}

            <ActionIcon
              label="Search"
              path="/search"
              icon={<Search />}
            />

            {/* Wishlist */}

            <ActionIcon
              label="Wishlist"
              path="/wishlist"
              icon={<FavoriteBorder />}
            />

            {/* Cart */}

            <ActionIcon
              label="Shopping Bag"
              path="/bag"
              badge={totalItems > 0 ? totalItems : undefined}
              icon={<ShoppingBagOutlined />}
            />

            {/* Account */}

            {desktop && (
              <ActionIcon
                label="Customer Account"
                path="/account"
                icon={<Person />}
              />
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* =====================================================
          MOBILE / TABLET / LAPTOP DRAWER
      ===================================================== */}

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: {
              xs: "86%",
              sm: 360,
              md: 400,
              lg: 420,
            },

            maxWidth: "420px",

            backgroundColor:
              colors.background,
          },
        }}
      >
        <Box
          sx={{
            height: "100%",

            display: "flex",

            flexDirection: "column",
          }}
        >
          {/* =================================================
              DRAWER HEADER
          ================================================= */}

          <Box
            sx={{
              minHeight: {
                xs: 76,
                sm: 82,
              },

              px: {
                xs: 2,
                sm: 2.5,
              },

              display: "flex",

              alignItems: "center",

              justifyContent:
                "space-between",

              borderBottom:
                `1px solid ${colors.border}`,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontFamily:
                    '"Times New Roman", Georgia, serif',

                  fontSize: {
                    xs: "25px",
                    sm: "28px",
                  },

                  fontWeight: 700,

                  letterSpacing: "2px",

                  lineHeight: 1,
                }}
              >
                ROXVORA
              </Typography>

              <Typography
                sx={{
                  fontSize: "7px",

                  letterSpacing: "2.5px",

                  color: colors.muted,

                  mt: 0.5,

                  textAlign: "center",
                }}
              >
                OWN THE LOOK
              </Typography>
            </Box>

            <IconButton
              onClick={() =>
                setDrawerOpen(false)
              }
              aria-label="Close navigation menu"
              sx={{
                width: 42,

                height: 42,

                "&:hover": {
                  backgroundColor:
                    colors.hover,
                },
              }}
            >
              <Close />
            </IconButton>
          </Box>

          {/* =================================================
              DRAWER NAVIGATION
          ================================================= */}

          <List
            disablePadding
            sx={{
              px: {
                xs: 1,
                sm: 1.5,
              },

              py: 1.5,

              flex: 1,
            }}
          >
            {navItems.map((item) => {
              const active = isActive(
                item.path
              );

              return (
                <ListItemButton
                  key={item.path}
                  onClick={() =>
                    goTo(item.path)
                  }
                  selected={active}
                  sx={{
                    minHeight: {
                      xs: 52,
                      sm: 56,
                    },

                    px: {
                      xs: 1.5,
                      sm: 2,
                    },

                    mb: 0.5,

                    borderRadius: "4px",

                    color: colors.black,

                    "&.Mui-selected": {
                      backgroundColor:
                        colors.hover,
                    },

                    "&.Mui-selected:hover": {
                      backgroundColor:
                        colors.hover,
                    },

                    "&:hover": {
                      backgroundColor:
                        colors.hover,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: {
                        xs: 42,
                        sm: 46,
                      },

                      color: colors.black,

                      "& svg": {
                        fontSize: {
                          xs: 21,
                          sm: 22,
                        },
                      },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      sx: {
                        fontSize: {
                          xs: "13px",
                          sm: "14px",
                        },

                        fontWeight:
                          active ? 700 : 500,

                        letterSpacing:
                          "0.1px",
                      },
                    }}
                  />

                  {item.label === "Cart" && (
                    <Badge
                      badgeContent={2}
                      sx={{
                        mr: 1,

                        "& .MuiBadge-badge": {
                          backgroundColor:
                            colors.black,

                          color: colors.white,

                          fontSize: "9px",

                          minWidth: 18,

                          height: 18,
                        },
                      }}
                    />
                  )}
                </ListItemButton>
              );
            })}
          </List>

          {/* =================================================
              DRAWER FOOTER
          ================================================= */}

          <Box
            sx={{
              px: {
                xs: 2,
                sm: 2.5,
              },

              pb: {
                xs: 2.5,
                sm: 3,
              },
            }}
          >
            <Divider
              sx={{
                mb: 2,
                borderColor: colors.border,
              }}
            />

            <Typography
              sx={{
                fontSize: "8px",

                letterSpacing: "1.5px",

                color: colors.muted,

                textAlign: "center",
              }}
            >
              ROXVORA — OWN THE LOOK
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;