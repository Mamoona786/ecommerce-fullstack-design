import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";

import AdminRoute from "../components/common/AdminRoute";

import AdminDashboard from "../admin/pages/AdminDashboard";

import AddCategory from "../admin/pages/categories/AddCategory";
import ViewCategories from "../admin/pages/categories/ViewCategories";

import AddProduct from "../admin/pages/products/AddProduct";
import ViewProducts from "../admin/pages/products/ViewProducts";

import AddUser from "../admin/pages/users/AddUser";
import ViewUsers from "../admin/pages/users/ViewUsers";

import AdminCart from "../admin/pages/cart/AdminCart";
import AdminOrders from "../admin/pages/orders/AdminOrders";
// import AddCategory from "../admin/pages/categories/AddCategory";
// import ViewCategories from "../admin/pages/categories/ViewCategories";
// import AddProduct from "../admin/pages/products/AddProduct";
// import ViewProducts from "../admin/pages/products/ViewProducts";
// import AddUser from "../admin/pages/users/AddUser";
// import ViewUsers from "../admin/pages/users/ViewUsers";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/admin/categories/add" element={<AddCategory />} />
        <Route path="/admin/categories/view" element={<ViewCategories />} />

        <Route path="/admin/products/add" element={<AddProduct />} />
        <Route path="/admin/products/view" element={<ViewProducts />} />

        <Route path="/admin/users/add" element={<AddUser />} />
        <Route path="/admin/users/view" element={<ViewUsers />} />

        <Route path="/admin/cart" element={<AdminCart />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
