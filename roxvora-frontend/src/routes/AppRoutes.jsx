
import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
  useLocation,
  NavLink,
} from "react-router-dom";

import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import MainLayout from "../components/layout/MainLayout";
import AdminLayout from "../components/layout/AdminLayout";

import HomePage from "../pages/customer/Home/HomePage";
import ShopPage from "../pages/customer/Shop/ShopPage";
import CategoryPage from "../pages/customer/Category/CategoryPage";
import ProductDetailsPage from "../pages/customer/ProductDetails/ProductDetailsPage";

import CartPage from "../pages/customer/Cart/CartPage";
import WishlistPage from "../pages/customer/Wishlist/WishlistPage";
import CheckoutPage from "../pages/customer/Checkout/CheckoutPage";

import LoginPage from "../pages/customer/Auth/LoginPage";
import RegisterPage from "../pages/customer/Auth/RegisterPage";
import ForgotPasswordPage from "../pages/customer/Auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/customer/Auth/ResetPasswordPage";

import DashboardPage from "../pages/admin/Dashboard/DashboardPage";
import ProductsPage from "../pages/admin/Products/ProductsPage";
import AddProductPage from "../pages/admin/Products/AddProductPage";
import EditProductPage from "../pages/admin/Products/EditProductPage";
import OrdersPage from "../pages/admin/Orders/OrdersPage";
import CategoriesPage from "../pages/admin/Categories/CategoriesPage";

import NotFoundPage from "../pages/customer/Errors/NotFoundPage";
import ServerErrorPage from "../pages/customer/Errors/ServerErrorPage";

import InfoPage from "../pages/customer/Info/InfoPage";
import { INFO_SLUGS } from "../pages/customer/Info/infoContent";

import AccountLayout from "../pages/customer/Account/AccountLayout";
import AccountProfilePage from "../pages/customer/Account/AccountProfilePage";
import AccountOrdersPage from "../pages/customer/Account/AccountOrdersPage";
import AccountOrderDetailPage from "../pages/customer/Account/AccountOrderDetailPage";
import AccountAddressesPage from "../pages/customer/Account/AccountAddressesPage";
import AccountPaymentPage from "../pages/customer/Account/AccountPaymentPage";
import AccountSettingsPage from "../pages/customer/Account/AccountSettingsPage";

import Navbar from "../components/layout/Navbar/Navbar";
import ProductionPage from "../components/home/ProductionPage";

import { AdminRoute } from "../components/common/ProtectedRoute/ProtectedRoute";
// import { SECTION_LIST } from "../api/catalogApi";
import { SECTION_LIST } from "../../src/api/CatalogApi"
// Scroll to top whenever the route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

// Category navigation header from Code 1
function CategoryHeader() {
  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        bgcolor: "rgba(246,242,234,.9)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            gap: 2,
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Typography
            component={NavLink}
            to="/"
            variant="h5"
            sx={{
              color: "secondary.main",
              textDecoration: "none",
              fontWeight: 800,
            }}
          >
            Maison
          </Typography>

          <Stack
            direction="row"
            spacing={0.5}
            component="nav"
            aria-label="Main categories"
            sx={{ overflowX: "auto" }}
          >
            {SECTION_LIST.map((section) => (
              <Button
                key={section.key}
                component={NavLink}
                to={`/category/${section.key}`}
                color="secondary"
                sx={{
                  "&.active": {
                    bgcolor: "secondary.main",
                    color: "#fff",
                  },
                }}
              >
                {section.title}
              </Button>
            ))}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

// Edit Product Route
const EditProductRoute = () => {
  const params = useParams();
  return <EditProductPage params={params} />;
};

// Admin placeholder
const AdminPlaceholder = ({ title }) => (
  <div className="card p-12 text-center">
    <h1 className="text-2xl font-secondary font-bold text-primary mb-2">
      {title}
    </h1>
    <p className="text-secondary">
      This section is not built yet.
    </p>
  </div>
);

// Main Application Routes
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>

        {/* Customer Layout */}
        <Route element={<MainLayout />}>

          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* Existing Navbar */}
          <Route path="/navbar" element={<Navbar />} />

          {/* Shop */}
          <Route path="/shop" element={<ShopPage />} />

          {/* Existing Category Pages */}
          <Route path="/shop/:category" element={<CategoryPage />} />
          <Route path="/shop/:category/:sub" element={<CategoryPage />} />

          {/* Code 1 Category Routes */}
          <Route path="/category/:section" element={<CategoryPage />} />

          {/* Product Details */}
          <Route path="/product/:slug" element={<ProductDetailsPage />} />

          {/* Cart and Wishlist */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* Authentication */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Account */}
          <Route path="/account" element={<AccountLayout />}>
            <Route index element={<AccountProfilePage />} />
            <Route path="orders" element={<AccountOrdersPage />} />
            <Route
              path="orders/:orderId"
              element={<AccountOrderDetailPage />}
            />
            <Route path="addresses" element={<AccountAddressesPage />} />
            <Route path="payment" element={<AccountPaymentPage />} />
            <Route path="settings" element={<AccountSettingsPage />} />
          </Route>

          {/* Information Pages */}
          {INFO_SLUGS.map((slug) => (
            <Route
              key={slug}
              path={`/${slug}`}
              element={<InfoPage />}
            />
          ))}

        </Route>

        {/* Admin Layout */}
        <Route element={<AdminLayout />}>

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <DashboardPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <ProductsPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/products/new"
            element={
              <AdminRoute>
                <AddProductPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/products/:id/edit"
            element={
              <AdminRoute>
                <EditProductRoute />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <OrdersPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/categories"
            element={
              <AdminRoute>
                <CategoriesPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/customers"
            element={
              <AdminRoute>
                <AdminPlaceholder title="Customers" />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/offers"
            element={
              <AdminRoute>
                <AdminPlaceholder title="Offers" />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/content"
            element={
              <AdminRoute>
                <AdminPlaceholder title="Content" />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/settings"
            element={
              <AdminRoute>
                <AdminPlaceholder title="Settings" />
              </AdminRoute>
            }
          />

        </Route>

        {/* Error Pages */}
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="/500" element={<ServerErrorPage />} />

        {/* Fallback */}
        <Route
          path="*"
          element={<Navigate to="/404" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
