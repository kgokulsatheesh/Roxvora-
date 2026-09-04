import React, { useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Search,
  FavoriteBorder,
  ShoppingBagOutlined,
  Person,
  Menu as MenuIcon,
  Close,
  KeyboardArrowDown,
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
  ListItemText,
  Button,
  Badge,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";

/* =====================================================
   HOME PAGE
===================================================== */

const Home = () => {
  const navigate = useNavigate();

  const collections = [
    {
      title: "Men's Collection",
      image:
        "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Women's Collection",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "New Arrivals",
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
    },
  ];

  return (
    <>
      {/* HERO SECTION */}

      <Box
        sx={{
          minHeight: {
            xs: "520px",
            sm: "600px",
            md: "700px",
          },
          backgroundImage:
            "url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
          }}
        />

        <Container sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ maxWidth: 650 }}>
            <Typography
              sx={{
                color: "#fff",
                fontSize: {
                  xs: 40,
                  sm: 52,
                  md: 68,
                },
                fontWeight: 800,
                lineHeight: 1.1,
                mb: 2,
              }}
            >
              NEW SEASON
            </Typography>

            <Typography
              sx={{
                color: "#fff",
                fontSize: {
                  xs: 17,
                  sm: 20,
                  md: 23,
                },
                mb: 4,
              }}
            >
              Discover premium fashion designed for your
              everyday style.
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate("/shop")}
              sx={{
                background: "#111",
                px: 4,
                py: 1.5,
                "&:hover": {
                  background: "#333",
                },
              }}
            >
              SHOP NOW
            </Button>
          </Box>
        </Container>
      </Box>

      {/* FEATURED COLLECTIONS */}

      <Container sx={{ py: { xs: 5, md: 8 } }}>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: {
              xs: 28,
              md: 38,
            },
            fontWeight: 700,
            mb: 5,
          }}
        >
          Featured Collections
        </Typography>

        <Grid container spacing={3}>
          {collections.map((item) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={item.title}
            >
              <Card
                onClick={() => navigate("/collections")}
                sx={{
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 0,
                  boxShadow: "none",
                }}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  sx={{
                    height: {
                      xs: 400,
                      sm: 350,
                      md: 450,
                    },
                    objectFit: "cover",
                    transition: "0.4s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />

                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 3,
                    background:
                      "linear-gradient(transparent, rgba(0,0,0,.8))",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: 22,
                      fontWeight: 700,
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* PROMOTION */}

      <Box
        sx={{
          background: "#111",
          color: "#fff",
          textAlign: "center",
          py: {
            xs: 6,
            md: 8,
          },
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: 32,
              md: 45,
            },
            fontWeight: 800,
          }}
        >
          UP TO 50% OFF
        </Typography>

        <Typography sx={{ mt: 1, mb: 3 }}>
          Limited time offers on selected styles.
        </Typography>

        <Button
          variant="outlined"
          onClick={() => navigate("/offers")}
          sx={{
            color: "#fff",
            borderColor: "#fff",
            px: 4,
            py: 1.3,
          }}
        >
          VIEW OFFERS
        </Button>
      </Box>
    </>
  );
};

/* =====================================================
   SHOP PAGE
===================================================== */

const Shop = () => {
  const products = [
    {
      name: "Premium Black Shirt",
      price: "₹1,499",
      image:
        "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Classic White Shirt",
      price: "₹1,299",
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Casual Jacket",
      price: "₹2,499",
      image:
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Premium T-Shirt",
      price: "₹999",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <Container
      sx={{
        py: {
          xs: 5,
          md: 8,
        },
        minHeight: "70vh",
      }}
    >
      <Typography
        sx={{
          fontSize: {
            xs: 35,
            md: 48,
          },
          fontWeight: 700,
        }}
      >
        Shop
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 5 }}>
        Explore our complete collection.
      </Typography>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={product.name}
          >
            <Card
              sx={{
                height: "100%",
                boxShadow: "none",
                border: "1px solid #eee",
              }}
            >
              <CardMedia
                component="img"
                image={product.image}
                sx={{
                  height: {
                    xs: 400,
                    sm: 350,
                    md: 380,
                  },
                  objectFit: "cover",
                }}
              />

              <CardContent>
                <Typography fontWeight={600}>
                  {product.name}
                </Typography>

                <Typography
                  fontWeight={700}
                  sx={{ mt: 1 }}
                >
                  {product.price}
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 2,
                    background: "#111",
                  }}
                >
                  ADD TO CART
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

/* =====================================================
   SIMPLE PAGE
===================================================== */

const SimplePage = ({
  title,
  description,
}) => {
  return (
    <Container
      sx={{
        py: 8,
        minHeight: "70vh",
      }}
    >
      <Typography
        sx={{
          fontSize: {
            xs: 35,
            md: 48,
          },
          fontWeight: 700,
          mb: 2,
        }}
      >
        {title}
      </Typography>

      <Typography
        color="text.secondary"
        fontSize={18}
      >
        {description}
      </Typography>
    </Container>
  );
};

/* =====================================================
   SEARCH PAGE
===================================================== */

const SearchPage = () => {
  return (
    <Container
      sx={{
        py: 8,
        minHeight: "70vh",
      }}
    >
      <Typography
        sx={{
          fontSize: {
            xs: 32,
            md: 45,
          },
          fontWeight: 700,
          mb: 4,
        }}
      >
        Search Products
      </Typography>

      <TextField
        fullWidth
        placeholder="Search products..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
};

/* =====================================================
   NAVBAR
===================================================== */

const Navbar = () => {
  const mobile = useMediaQuery("(max-width:600px)");
  const tablet = useMediaQuery(
    "(min-width:601px) and (max-width:960px)"
  );

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shopAnchor, setShopAnchor] = useState(null);

  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    setDrawerOpen(false);
    setShopAnchor(null);
  };

  return (
    <>
      {/* TOP ANNOUNCEMENT BAR */}

      <Box
        sx={{
          background: "#111",
          color: "#fff",
          textAlign: "center",
          py: 1,
          px: 2,
          fontSize: {
            xs: 11,
            sm: 13,
          },
        }}
      >
        FREE SHIPPING ON ORDERS ABOVE ₹999
      </Box>

      {/* NAVBAR */}

      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "#fff",
          color: "#111",
          borderBottom: "1px solid #eee",
        }}
      >
        <Toolbar
          sx={{
            minHeight: {
              xs: 65,
              md: 80,
            },
            px: {
              xs: 1,
              sm: 3,
              md: 5,
            },
          }}
        >
          {/* MOBILE / TABLET MENU */}

          {(mobile || tablet) && (
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* LOGO */}

          <Typography
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "#111",
              fontSize: {
                xs: 23,
                sm: 27,
                md: 30,
              },
              fontWeight: 900,
              letterSpacing: 2,
              mr: {
                xs: "auto",
                md: 3,
              },
            }}
          >
            ROXVORA
          </Typography>

          {/* DESKTOP NAV */}

          {!mobile && !tablet && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              {/* HOME */}

              <Button
                component={Link}
                to="/"
                color="inherit"
              >
                Home
              </Button>

              {/* SHOP */}

              <Button
                color="inherit"
                endIcon={<KeyboardArrowDown />}
                onClick={(event) =>
                  setShopAnchor(event.currentTarget)
                }
              >
                Shop
              </Button>

              <Menu
                anchorEl={shopAnchor}
                open={Boolean(shopAnchor)}
                onClose={() => setShopAnchor(null)}
              >
                <MenuItem
                  onClick={() => goTo("/shop")}
                >
                  All Products
                </MenuItem>

                <MenuItem
                  onClick={() =>
                    goTo("/new-arrivals")
                  }
                >
                  New Arrivals
                </MenuItem>

                <MenuItem
                  onClick={() =>
                    goTo("/best-sellers")
                  }
                >
                  Best Sellers
                </MenuItem>
              </Menu>

              {/* NEW ARRIVALS */}

              <Button
                component={Link}
                to="/new-arrivals"
                color="inherit"
              >
                New Arrivals
              </Button>

              {/* BEST SELLERS */}

              <Button
                component={Link}
                to="/best-sellers"
                color="inherit"
              >
                Best Sellers
              </Button>

              {/* COLLECTIONS */}

              <Button
                component={Link}
                to="/collections"
                color="inherit"
              >
                Collections
              </Button>

              {/* OFFERS */}

              <Button
                component={Link}
                to="/offers"
                color="inherit"
              >
                Offers
              </Button>
            </Box>
          )}

          {/* RIGHT SIDE ICONS */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              ml: {
                xs: 0,
                md: "auto",
              },
            }}
          >
            {/* SEARCH */}

            <IconButton
              onClick={() => navigate("/search")}
            >
              <Search />
            </IconButton>

            {/* WISHLIST */}

            <IconButton
              onClick={() => navigate("/wishlist")}
            >
              <FavoriteBorder />
            </IconButton>

            {/* CART */}

            <IconButton
              onClick={() => navigate("/cart")}
            >
              <Badge
                badgeContent={2}
                color="error"
              >
                <ShoppingBagOutlined />
              </Badge>
            </IconButton>

            {/* ACCOUNT */}

            {!mobile && (
              <IconButton
                onClick={() => navigate("/account")}
              >
                <Person />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* MOBILE / TABLET DRAWER */}

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{
            width: {
              xs: 280,
              sm: 320,
            },
          }}
        >
          {/* DRAWER HEADER */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              borderBottom: "1px solid #eee",
            }}
          >
            <Typography
              fontWeight={900}
              fontSize={21}
              letterSpacing={1}
            >
              ROXVORA
            </Typography>

            <IconButton
              onClick={() => setDrawerOpen(false)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* DRAWER ITEMS */}

          <List>

            <ListItemButton
              onClick={() => goTo("/")}
            >
              <ListItemText primary="Home" />
            </ListItemButton>

            <ListItemButton
              onClick={() => goTo("/shop")}
            >
              <ListItemText primary="Shop" />
            </ListItemButton>

            <ListItemButton
              onClick={() =>
                goTo("/new-arrivals")
              }
            >
              <ListItemText primary="New Arrivals" />
            </ListItemButton>

            <ListItemButton
              onClick={() =>
                goTo("/best-sellers")
              }
            >
              <ListItemText primary="Best Sellers" />
            </ListItemButton>

            <ListItemButton
              onClick={() =>
                goTo("/collections")
              }
            >
              <ListItemText primary="Collections" />
            </ListItemButton>

            <ListItemButton
              onClick={() => goTo("/offers")}
            >
              <ListItemText primary="Offers" />
            </ListItemButton>

            <ListItemButton
              onClick={() => goTo("/search")}
            >
              <ListItemText primary="Search" />
            </ListItemButton>

            <ListItemButton
              onClick={() => goTo("/wishlist")}
            >
              <ListItemText primary="Wishlist" />
            </ListItemButton>

            <ListItemButton
              onClick={() => goTo("/cart")}
            >
              <ListItemText primary="Cart" />
            </ListItemButton>

            <ListItemButton
              onClick={() => goTo("/account")}
            >
              <ListItemText primary="My Account" />
            </ListItemButton>

            <ListItemButton
              onClick={() => goTo("/contact")}
            >
              <ListItemText primary="Contact & Support" />
            </ListItemButton>

          </List>
        </Box>
      </Drawer>
    </>
  );
};

/* =====================================================
   APP
===================================================== */

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>

        {/* HOME */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* SHOP */}

        <Route
          path="/shop"
          element={<Shop />}
        />

        {/* NEW ARRIVALS */}

        <Route
          path="/new-arrivals"
          element={
            <SimplePage
              title="New Arrivals"
              description="Discover our latest fashion arrivals."
            />
          }
        />

        {/* BEST SELLERS */}

        <Route
          path="/best-sellers"
          element={
            <SimplePage
              title="Best Sellers"
              description="Shop our most popular products."
            />
          }
        />

        {/* COLLECTIONS */}

        <Route
          path="/collections"
          element={
            <SimplePage
              title="Collections"
              description="Explore our curated fashion collections."
            />
          }
        />

        {/* OFFERS */}

        <Route
          path="/offers"
          element={
            <SimplePage
              title="Offers"
              description="Grab the latest discounts and special offers."
            />
          }
        />

        {/* SEARCH */}

        <Route
          path="/search"
          element={<SearchPage />}
        />

        {/* WISHLIST */}

        <Route
          path="/wishlist"
          element={
            <SimplePage
              title="Wishlist"
              description="Your saved products will appear here."
            />
          }
        />

        {/* CART */}

        <Route
          path="/cart"
          element={
            <SimplePage
              title="Shopping Cart"
              description="Review your selected products and proceed to checkout."
            />
          }
        />

        {/* ACCOUNT */}

        <Route
          path="/account"
          element={
            <SimplePage
              title="My Account"
              description="Manage your profile, orders and addresses."
            />
          }
        />

        {/* CONTACT */}

        <Route
          path="/contact"
          element={
            <SimplePage
              title="Contact & Support"
              description="We're here to help. Contact our support team."
            />
          }
        />

      </Routes>
    </>
  );
};

export default App;