import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Checkout from "../pages/Checkout";
import Payment from "../pages/Payment";
import OrderConfirmation from "../pages/OrderConfirmation";
import MyOrders from "../pages/MyOrders";
import OrderDetails from "../pages/OrderDetails";
import Messages from "../pages/Messages";

import AdminRoute from "../components/common/AdminRoute";

import AdminDashboard from "../admin/pages/AdminDashboard";

import AddCategory from "../admin/pages/categories/AddCategory";
import ViewCategories from "../admin/pages/categories/ViewCategories";
import EditCategory from "../admin/pages/categories/EditCategory";

import AddProduct from "../admin/pages/products/AddProduct";
import ViewProducts from "../admin/pages/products/ViewProducts";
import EditProduct from "../admin/pages/products/EditProduct";

import AddUser from "../admin/pages/users/AddUser";
import ViewUsers from "../admin/pages/users/ViewUsers";
import EditUser from "../admin/pages/users/EditUser";

import AdminCart from "../admin/pages/cart/AdminCart";
import EditCart from "../admin/pages/cart/EditCart";

import AdminOrders from "../admin/pages/orders/AdminOrders";
import EditOrder from "../admin/pages/orders/EditOrder";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/orders/:orderId" element={<OrderDetails />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/admin/categories/add" element={<AddCategory />} />
        <Route path="/admin/categories/view" element={<ViewCategories />} />
        <Route path="/admin/categories/edit/:id" element={<EditCategory />} />

        <Route path="/admin/products/add" element={<AddProduct />} />
        <Route path="/admin/products/view" element={<ViewProducts />} />
        <Route path="/admin/products/edit/:id" element={<EditProduct />} />

        <Route path="/admin/users/add" element={<AddUser />} />
        <Route path="/admin/users/view" element={<ViewUsers />} />
        <Route path="/admin/users/edit/:id" element={<EditUser />} />

        <Route path="/admin/cart" element={<AdminCart />} />
        <Route path="/admin/carts/edit/:id" element={<EditCart />} />

        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/orders/edit/:id" element={<EditOrder />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
