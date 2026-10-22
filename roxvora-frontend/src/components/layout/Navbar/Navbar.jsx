import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
    ROXVORA LUXURY NAVBAR
    Universal Search Bar across Mobile, Tablet, Laptop & Desktop
========================================================= */

const searchPlaceholders = [
  "Search 'Best Women Collections'...",
  "Search 'Silk Evening Dresses'...",
  "Search 'Italian Wool Suits'...",
  "Search 'Summer Linen Midi'...",
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const cart = useCart ? useCart() : { totalItems: 0 };
  const totalItems = cart?.totalItems || 0;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Rotate placeholders every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchPlaceholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setDrawerOpen(false);
    }
  };

  /* =========================================================
     RESPONSIVE BREAKPOINTS
  ========================================================= */
  const mobile = useMediaQuery("(max-width:599px)");
  const tablet = useMediaQuery("(min-width:600px) and (max-width:959px)");
  const laptop = useMediaQuery("(min-width:960px) and (max-width:1199px)");
  const desktop = useMediaQuery("(min-width:1200px)");
  const isSmallScreen = useMediaQuery("(max-width:959px)");

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
    gold: "#D4AF37",
  };

  /* =========================================================
     NAVIGATION DATA
  ========================================================= */
  const navItems = [
    { label: "Home", path: "/", icon: <HomeOutlined /> },
    { label: "Shop / Product Listing", path: "/shop", icon: <StorefrontOutlined /> },
    { label: "Cart", path: "/bag", icon: <ShoppingBagOutlined /> },
    { label: "Checkout", path: "/checkout", icon: <CreditCardOutlined /> },
    { label: "Customer Account", path: "/account", icon: <Person /> },
    { label: "Wishlist", path: "/wishlist", icon: <FavoriteBorder /> },
    { label: "Contact & Support", path: "/contact", icon: <SupportAgentOutlined /> },
  ];

  const goTo = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

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
          px: { md: 1, lg: 1.3 },
          py: 1,
          color: colors.black,
          fontSize: { md: "11px", lg: "12px", xl: "13px" },
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

  const ActionIcon = ({ label, icon, path, badge }) => {
    const active = isActive(path);

    return (
      <IconButton
        onClick={() => goTo(path)}
        aria-label={label}
        sx={{
          width: { xs: 36, sm: 38, md: 40 },
          height: { xs: 36, sm: 38, md: 40 },
          color: colors.black,
          borderRadius: "50%",
          backgroundColor: active ? colors.hover : "transparent",
          transition: "all 0.2s ease",
          "&:hover": { backgroundColor: colors.hover },
          "& svg": { fontSize: { xs: 19, sm: 20, md: 21 } },
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
                minWidth: 16,
                height: 16,
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

  return (
    <>
      {/* ANNOUNCEMENT BAR */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: colors.black,
          color: colors.white,
          textAlign: "center",
          py: { xs: 0.8, sm: 0.9, md: 1 },
          px: 2,
          minHeight: { xs: 31, sm: 33, md: 35 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "8px", sm: "9px", md: "10px", lg: "11px" },
            fontWeight: 600,
            letterSpacing: { xs: "1px", sm: "1.4px", md: "1.7px" },
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          FREE SHIPPING ON ORDERS ABOVE ₹999
        </Typography>
      </Box>

      {/* MAIN NAVBAR */}
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
            minHeight: { xs: 64, sm: 68, md: 72, lg: 76 },
            px: { xs: 1.5, sm: 2, md: 3, lg: 4, xl: 5 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 1, sm: 2 },
          }}
        >
          {/* LEFT: MENU BUTTON (MOBILE/TABLET) & LOGO */}
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1 } }}>
            {isSmallScreen && (
              <IconButton
                onClick={() => setDrawerOpen(true)}
                aria-label="Open navigation menu"
                sx={{
                  color: colors.black,
                  width: 38,
                  height: 38,
                  "&:hover": { backgroundColor: colors.hover },
                }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Typography
              component={Link}
              to="/"
              onClick={() => setDrawerOpen(false)}
              sx={{
                textDecoration: "none",
                color: colors.black,
                fontFamily: '"Times New Roman", Georgia, serif',
                fontSize: { xs: "20px", sm: "24px", md: "28px", lg: "32px" },
                fontWeight: 700,
                letterSpacing: { xs: "1.5px", sm: "2px", md: "2.5px" },
                lineHeight: 1,
                whiteSpace: "nowrap",
                transition: "opacity 0.2s ease",
                "&:hover": { opacity: 0.65 },
              }}
            >
              ROXVORA
            </Typography>
          </Box>

          {/* CENTER/FLEX: UNIVERSAL SEARCH BAR (Visible on Mobile, Tablet, Laptop & Desktop) */}
          <Box
            component="form"
            onSubmit={handleSearchSubmit}
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              flex: { xs: 1, md: "0 1 280px", lg: "0 1 340px" },
              maxWidth: { xs: "180px", sm: "240px", md: "280px", lg: "340px" },
              mx: { xs: 1, sm: 2 },
            }}
          >
            <Search
              sx={{
                position: "absolute",
                left: 10,
                fontSize: { xs: "15px", sm: "17px" },
                color: colors.muted,
                pointerEvents: "none",
              }}
            />
            <Box
              component="input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                width: "100%",
                pl: { xs: "32px", sm: "36px" },
                pr: searchQuery ? "28px" : "10px",
                py: { xs: "6px", sm: "8px" },
                backgroundColor: colors.white,
                border: `1px solid ${colors.border}`,
                borderRadius: "20px",
                fontSize: { xs: "11px", sm: "12px" },
                color: colors.black,
                outline: "none",
                transition: "all 0.2s ease",
                "&:focus": {
                  borderColor: colors.black,
                  boxShadow: "0 0 0 1px #111111",
                },
              }}
            />
            {!searchQuery && (
              <Box
                sx={{
                  position: "absolute",
                  left: { xs: "32px", sm: "36px" },
                  right: "10px",
                  pointerEvents: "none",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={placeholderIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      fontSize: "11px",
                      color: colors.muted,
                      display: "block",
                      fontWeight: 400,
                    }}
                  >
                    {searchPlaceholders[placeholderIndex]}
                  </motion.span>
                </AnimatePresence>
              </Box>
            )}
            {searchQuery && (
              <IconButton
                type="button"
                onClick={() => setSearchQuery("")}
                size="small"
                sx={{
                  position: "absolute",
                  right: 6,
                  padding: "2px",
                  color: colors.muted,
                  "&:hover": { color: colors.black },
                }}
              >
                <Close sx={{ fontSize: "13px" }} />
              </IconButton>
            )}
          </Box>

          {/* DESKTOP NAV LINKS (Shown only on Desktop) */}
          {desktop && (
            <Box
              component="nav"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { lg: 0.5, xl: 1 },
              }}
            >
              {navItems.map((item) => (
                <DesktopNavItem key={item.path} item={item} />
              ))}
            </Box>
          )}

          {/* RIGHT ACTIONS (Wishlist, Bag, Account) */}
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0, sm: 0.5 } }}>
            <ActionIcon label="Wishlist" path="/wishlist" icon={<FavoriteBorder />} />
            <ActionIcon
              label="Shopping Bag"
              path="/bag"
              badge={totalItems > 0 ? totalItems : undefined}
              icon={<ShoppingBagOutlined />}
            />
            <ActionIcon label="Customer Account" path="/account" icon={<Person />} />
          </Box>
        </Toolbar>
      </AppBar>

      {/* MOBILE / TABLET / LAPTOP DRAWER (For navigation items on smaller screens) */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "86%", sm: 360, md: 400 },
            maxWidth: "420px",
            backgroundColor: colors.background,
          },
        }}
      >
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              minHeight: { xs: 76, sm: 82 },
              px: { xs: 2, sm: 2.5 },
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: `1px solid ${colors.border}`,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontFamily: '"Times New Roman", Georgia, serif',
                  fontSize: { xs: "25px", sm: "28px" },
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
              onClick={() => setDrawerOpen(false)}
              aria-label="Close navigation menu"
              sx={{ width: 42, height: 42, "&:hover": { backgroundColor: colors.hover } }}
            >
              <Close />
            </IconButton>
          </Box>

          <List disablePadding sx={{ px: { xs: 1, sm: 1.5 }, py: 1.5, flex: 1 }}>
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <ListItemButton
                  key={item.path}
                  onClick={() => goTo(item.path)}
                  selected={active}
                  sx={{
                    minHeight: { xs: 52, sm: 56 },
                    px: { xs: 1.5, sm: 2 },
                    mb: 0.5,
                    borderRadius: "4px",
                    color: colors.black,
                    "&.Mui-selected": { backgroundColor: colors.hover },
                    "&.Mui-selected:hover": { backgroundColor: colors.hover },
                    "&:hover": { backgroundColor: colors.hover },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: { xs: 42, sm: 46 },
                      color: colors.black,
                      "& svg": { fontSize: { xs: 21, sm: 22 } },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      sx: {
                        fontSize: { xs: "13px", sm: "14px" },
                        fontWeight: active ? 700 : 500,
                        letterSpacing: "0.1px",
                      },
                    }}
                  />
                  {item.label === "Cart" && totalItems > 0 && (
                    <Badge
                      badgeContent={totalItems}
                      sx={{
                        mr: 1,
                        "& .MuiBadge-badge": {
                          backgroundColor: colors.black,
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

          <Box sx={{ px: { xs: 2, sm: 2.5 }, pb: { xs: 2.5, sm: 3 } }}>
            <Divider sx={{ mb: 2, borderColor: colors.border }} />
            <Typography sx={{ fontSize: "8px", letterSpacing: "1.5px", color: colors.muted, textAlign: "center" }}>
              ROXVORA — OWN THE LOOK
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;