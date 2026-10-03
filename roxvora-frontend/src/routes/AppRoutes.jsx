import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import MainLayout from '@components/layout/MainLayout';
import AdminLayout from '@components/layout/AdminLayout';
import HomePage from '@pages/customer/Home/HomePage';
import ShopPage from '@pages/customer/Shop/ShopPage';
import CategoryPage from '@pages/customer/Shop/CategoryPage';
import ProductDetailsPage from '@pages/customer/Product/ProductDetailsPage';
import CartPage from '@pages/customer/Cart/CartPage';
import WishlistPage from '@pages/customer/Wishlist/WishlistPage';
import CheckoutPage from '@pages/customer/Checkout/CheckoutPage';
import LoginPage from '@pages/customer/Auth/LoginPage';
import RegisterPage from '@pages/customer/Auth/RegisterPage';
import ForgotPasswordPage from '@pages/customer/Auth/ForgotPasswordPage';
import ResetPasswordPage from '@pages/customer/Auth/ResetPasswordPage';
import DashboardPage from '@pages/admin/Dashboard/DashboardPage';
import ProductsPage from '@pages/admin/Products/ProductsPage';
import AddProductPage from '@pages/admin/Products/AddProductPage';
import EditProductPage from '@pages/admin/Products/EditProductPage';
import OrdersPage from '@pages/admin/Orders/OrdersPage';
import CategoriesPage from '@pages/admin/Categories/CategoriesPage';
import NotFoundPage from '@pages/customer/Errors/NotFoundPage';
import ServerErrorPage from '@pages/customer/Errors/ServerErrorPage';
import InfoPage from '@pages/customer/Info/InfoPage';
import AccountLayout from '@pages/customer/Account/AccountLayout';
import AccountProfilePage from '@pages/customer/Account/AccountProfilePage';
import AccountOrdersPage from '@pages/customer/Account/AccountOrdersPage';
import AccountOrderDetailPage from '@pages/customer/Account/AccountOrderDetailPage';
import AccountAddressesPage from '@pages/customer/Account/AccountAddressesPage';
import AccountPaymentPage from '@pages/customer/Account/AccountPaymentPage';
import AccountSettingsPage from '@pages/customer/Account/AccountSettingsPage';
import { INFO_SLUGS } from '@pages/customer/Info/infoContent';
import { AdminRoute } from '@components/common/ProtectedRoute/ProtectedRoute';

// EditProductPage receives `params` rather than calling useParams itself.
const EditProductRoute = () => {
  const params = useParams();
  return <EditProductPage params={params} />;
};

const AdminPlaceholder = ({ title }) => (
  <div className="card p-12 text-center">
    <h1 className="text-2xl font-secondary font-bold text-primary mb-2">{title}</h1>
    <p className="text-secondary">This section is not built yet.</p>
  </div>
);

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:category/:subcategory" element={<CategoryPage />} />
          <Route path="/shop/:category" element={<CategoryPage />} />
          <Route path="/product/:slug" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/account" element={<AccountLayout />}>
            <Route index element={<AccountProfilePage />} />
            <Route path="orders" element={<AccountOrdersPage />} />
            <Route path="orders/:orderId" element={<AccountOrderDetailPage />} />
            <Route path="addresses" element={<AccountAddressesPage />} />
            <Route path="payment" element={<AccountPaymentPage />} />
            <Route path="settings" element={<AccountSettingsPage />} />
          </Route>
          {INFO_SLUGS.map((slug) => (
            <Route key={slug} path={`/${slug}`} element={<InfoPage />} />
          ))}
        </Route>

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

        <Route path="/404" element={<NotFoundPage />} />
        <Route path="/500" element={<ServerErrorPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;