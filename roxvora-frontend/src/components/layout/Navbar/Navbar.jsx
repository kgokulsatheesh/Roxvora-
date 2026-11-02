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
    Unified Navbar with Cart & Wishlist Integration
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
  
  // Safe check for cart context
  let totalItems = 0;
  try {
    const cart = useCart();
    totalItems = cart?.totalItems || 0;
  } catch (err) {
    totalItems = 0;
  }

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Rotate search placeholders every 3 seconds
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
      setSearchQuery("");
    }
  };

  /* =========================================================
     RESPONSIVE BREAKPOINTS
  ========================================================= */
  const isDesktop = useMediaQuery("(min-width:1200px)");

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
     NAVIGATION DATA (Includes Bag and Wishlist Links)
  ========================================================= */
  const navItems = [
    { label: "Home", path: "/", icon: <HomeOutlined /> },
    { label: "Shop / Product Listing", path: "/shop", icon: <StorefrontOutlined /> },
    { label: "Shopping Bag", path: "/bag", icon: <ShoppingBagOutlined /> },
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
          width: { xs: 38, sm: 40, md: 42 },
          height: { xs: 38, sm: 40, md: 42 },
          color: colors.black,
          borderRadius: "50%",
          backgroundColor: active ? colors.hover : "transparent",
          transition: "all 0.2s ease",
          "&:hover": { backgroundColor: colors.hover },
          "& svg": { fontSize: { xs: 20, sm: 21, md: 22 } },
        }}
      >
        {badge !== undefined ? (
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
            px: { xs: 1.5, sm: 2.5, md: 3, lg: 4, xl: 5 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* LEFT: MOBILE MENU BUTTON & LOGO */}
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1 } }}>
            {!isDesktop && (
              <IconButton
                onClick={() => setDrawerOpen(true)}
                aria-label="Open navigation menu"
                sx={{
                  color: colors.black,
                  width: 40,
                  height: 40,
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
                fontSize: { xs: "22px", sm: "26px", md: "30px", lg: "32px" },
                fontWeight: 700,
                letterSpacing: { xs: "2px", sm: "2.5px", md: "3px" },
                lineHeight: 1,
                whiteSpace: "nowrap",
                transition: "opacity 0.2s ease",
                "&:hover": { opacity: 0.65 },
              }}
            >
              ROXVORA
            </Typography>
          </Box>

          {/* DESKTOP NAV LINKS */}
          {isDesktop && (
            <Box
              component="nav"
              sx={{
                display: "flex",
                alignItems: "center",
                flex: 1,
                justifyContent: "center",
                gap: { lg: 0.5, xl: 1 },
                mx: 2,
              }}
            >
              {navItems.map((item) => (
                <DesktopNavItem key={item.path} item={item} />
              ))}
            </Box>
          )}

          {/* DESKTOP SEARCH BAR & RIGHT ACTIONS (Wishlist, Bag, Account) */}
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1 } }}>
            {isDesktop && (
              <Box
                component="form"
                onSubmit={handleSearchSubmit}
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  width: "240px",
                  mr: 1,
                }}
              >
                <Search
                  sx={{
                    position: "absolute",
                    left: 10,
                    fontSize: "17px",
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
                    pl: "36px",
                    pr: searchQuery ? "28px" : "10px",
                    py: "8px",
                    backgroundColor: colors.white,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "20px",
                    fontSize: "12px",
                    color: colors.black,
                    outline: "none",
                    "&:focus": { borderColor: colors.black, boxShadow: "0 0 0 1px #111111" },
                  }}
                />
                {!searchQuery && (
                  <Box
                    sx={{
                      position: "absolute",
                      left: "36px",
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
                        style={{ fontSize: "11px", color: colors.muted, display: "block" }}
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
                    sx={{ position: "absolute", right: 6, padding: "2px", color: colors.muted }}
                  >
                    <Close sx={{ fontSize: "13px" }} />
                  </IconButton>
                )}
              </Box>
            )}

            {/* Wishlist Action Icon */}
            <ActionIcon label="Wishlist" path="/wishlist" icon={<FavoriteBorder />} />

            {/* Shopping Bag Action Icon with dynamic item count badge */}
            <ActionIcon
              label="Shopping Bag"
              path="/bag"
              badge={totalItems > 0 ? totalItems : undefined}
              icon={<ShoppingBagOutlined />}
            />

            {/* Account Action Icon */}
            {isDesktop && <ActionIcon label="Customer Account" path="/account" icon={<Person />} />}
          </Box>
        </Toolbar>
      </AppBar>

      {/* MOBILE / TABLET SLIDE-OUT DRAWER */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "88%", sm: 360 },
            maxWidth: "420px",
            backgroundColor: colors.background,
          },
        }}
      >
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          
          {/* DRAWER HEADER WITH LIVE SEARCH BAR */}
          <Box
            sx={{
              p: { xs: 2, sm: 2.5 },
              borderBottom: `1px solid ${colors.border}`,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Typography
                sx={{
                  fontFamily: '"Times New Roman", Georgia, serif',
                  fontSize: { xs: "24px", sm: "28px" },
                  fontWeight: 700,
                  letterSpacing: "2px",
                }}
              >
                ROXVORA
              </Typography>
              <IconButton onClick={() => setDrawerOpen(false)} sx={{ width: 40, height: 40 }}>
                <Close />
              </IconButton>
            </Box>

            {/* Mobile Instant Search Bar inside Drawer */}
            <Box
              component="form"
              onSubmit={handleSearchSubmit}
              sx={{ position: "relative", display: "flex", alignItems: "center", width: "100%" }}
            >
              <Search
                sx={{
                  position: "absolute",
                  left: 12,
                  fontSize: "18px",
                  color: colors.muted,
                  pointerEvents: "none",
                }}
              />
              <Box
                component="input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                sx={{
                  width: "100%",
                  pl: "38px",
                  pr: "12px",
                  py: "10px",
                  backgroundColor: colors.white,
                  border: `1px solid ${colors.border}`,
                  borderRadius: "20px",
                  fontSize: "13px",
                  color: colors.black,
                  outline: "none",
                  "&:focus": { borderColor: colors.black },
                }}
              />
            </Box>
          </Box>

          {/* ALL NAVIGATION SECTIONS IN DRAWER (Includes Bag & Wishlist) */}
          <List disablePadding sx={{ px: 1.5, py: 1.5, flex: 1, overflowY: "auto" }}>
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <ListItemButton
                  key={item.path}
                  onClick={() => goTo(item.path)}
                  selected={active}
                  sx={{
                    minHeight: 52,
                    px: 2,
                    mb: 0.5,
                    borderRadius: "6px",
                    color: colors.black,
                    "&.Mui-selected": { backgroundColor: colors.hover },
                    "&:hover": { backgroundColor: colors.hover },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 44, color: colors.black }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      sx: { fontSize: "14px", fontWeight: active ? 700 : 500 },
                    }}
                  />
                  {item.label === "Shopping Bag" && totalItems > 0 && (
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

          {/* DRAWER FOOTER */}
          <Box sx={{ p: 2.5 }}>
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