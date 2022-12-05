import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProducts from "../admin/AddProducts";
import AllProducts from "../admin/AllProducts";
import Dashboard from "../admin/Dashboard";
import Users from "../admin/Users";
import Cart from "../pages/Cart";
import Cheackout from "../pages/Cheackout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProductDetails from "../pages/ProductDetails";
import Shop from "../pages/Shop";
import Signup from "../pages/Signup";
import ProtectedRoute from "./ProtectedRoute";

const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/*" element={<ProtectedRoute />}>
          <Route path="checkout" element={<Cheackout />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/all-products" element={<AllProducts />} />
          <Route path="dashboard/add-product" element={<AddProducts />} />
          <Route path="dashboard/users" element={<Users />} />
        </Route>
        {/* <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Cheackout />
            </ProtectedRoute>
          }
        /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default Routers;
