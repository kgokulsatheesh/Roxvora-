import React from "react";

import {
  Routes,
  Route,
} from "react-router-dom";

import HomePage from "../pages/customer/Home/HomePage";
import ShopPage from "../pages/customer/Shop/ShopPage";

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/shop"
        element={<ShopPage />}
      />
    </Routes>
  );
};

export default CustomerRoutes;