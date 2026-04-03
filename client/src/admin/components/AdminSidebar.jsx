import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaTags,
  FaUsers,
  FaShoppingCart,
  FaClipboardList,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaPlus,
  FaList,
} from "react-icons/fa";
import "../styles/adminSidebar.css";
import { useNavigate } from "react-router-dom";
import { FaHeadset } from "react-icons/fa";

const AdminSidebar = () => {
  const location = useLocation();

  const [categoryOpen, setCategoryOpen] = useState(true);
  const [productsOpen, setProductsOpen] = useState(true);
  const [usersOpen, setUsersOpen] = useState(true);

  const isActive = (path) => location.pathname === path;
  const isGroupActive = (paths = []) => paths.includes(location.pathname);

  const navigate = useNavigate();

const handleLogout = () => {
  if (window.confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }
};

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-top">
        <div className="admin-sidebar-brand-row">
          <h2 className="admin-sidebar-brand">Super Store</h2>
          <button type="button" className="admin-sidebar-collapse-btn">
            <FaAngleDoubleLeft />
          </button>
        </div>
      </div>

      <div className="admin-sidebar-menu">
        <Link
          to="/admin"
          className={`admin-sidebar-item admin-sidebar-item-card ${
            isActive("/admin") ? "active" : ""
          }`}
        >
          <span className="admin-sidebar-item-left">
            <FaTachometerAlt className="admin-sidebar-icon" />
            <span>Dashboard</span>
          </span>
        </Link>

        <div className="admin-sidebar-group">
          <button
            type="button"
            className={`admin-sidebar-item ${
              isGroupActive([
                "/admin/categories/add",
                "/admin/categories/view",
              ])
                ? "active-plain"
                : ""
            }`}
            onClick={() => setCategoryOpen((prev) => !prev)}
          >
            <span className="admin-sidebar-item-left">
              <FaTags className="admin-sidebar-icon" />
              <span>Category</span>
            </span>
            <span className="admin-sidebar-arrow-circle">
              <FaChevronRight
                className={`admin-sidebar-arrow ${categoryOpen ? "rotate" : ""}`}
              />
            </span>
          </button>

          {categoryOpen && (
            <div className="admin-sidebar-submenu">
              <Link
                to="/admin/categories/add"
                className={`admin-sidebar-subitem ${
                  isActive("/admin/categories/add") ? "active-sub" : ""
                }`}
              >
                <FaPlus className="admin-sidebar-subicon" />
                <span>Add Category</span>
              </Link>

              <Link
                to="/admin/categories/view"
                className={`admin-sidebar-subitem ${
                  isActive("/admin/categories/view") ? "active-sub" : ""
                }`}
              >
                <FaList className="admin-sidebar-subicon" />
                <span>View Categories</span>
              </Link>
            </div>
          )}
        </div>

        <div className="admin-sidebar-group">
          <button
            type="button"
            className={`admin-sidebar-item ${
              isGroupActive([
                "/admin/products/add",
                "/admin/products/view",
              ])
                ? "active-plain"
                : ""
            }`}
            onClick={() => setProductsOpen((prev) => !prev)}
          >
            <span className="admin-sidebar-item-left">
              <FaBoxOpen className="admin-sidebar-icon" />
              <span>Products</span>
            </span>
            <span className="admin-sidebar-arrow-circle">
              <FaChevronRight
                className={`admin-sidebar-arrow ${productsOpen ? "rotate" : ""}`}
              />
            </span>
          </button>

          {productsOpen && (
            <div className="admin-sidebar-submenu">
              <Link
                to="/admin/products/add"
                className={`admin-sidebar-subitem ${
                  isActive("/admin/products/add") ? "active-sub" : ""
                }`}
              >
                <FaPlus className="admin-sidebar-subicon" />
                <span>Add Product</span>
              </Link>

              <Link
                to="/admin/products/view"
                className={`admin-sidebar-subitem ${
                  isActive("/admin/products/view") ? "active-sub" : ""
                }`}
              >
                <FaList className="admin-sidebar-subicon" />
                <span>View Products</span>
              </Link>
            </div>
          )}
        </div>

        <div className="admin-sidebar-group">
          <button
            type="button"
            className={`admin-sidebar-item ${
              isGroupActive([
                "/admin/users/add",
                "/admin/users/view",
              ])
                ? "active-plain"
                : ""
            }`}
            onClick={() => setUsersOpen((prev) => !prev)}
          >
            <span className="admin-sidebar-item-left">
              <FaUsers className="admin-sidebar-icon" />
              <span>Users</span>
            </span>
            <span className="admin-sidebar-arrow-circle">
              <FaChevronRight
                className={`admin-sidebar-arrow ${usersOpen ? "rotate" : ""}`}
              />
            </span>
          </button>

          {usersOpen && (
            <div className="admin-sidebar-submenu">
              <Link
                to="/admin/users/add"
                className={`admin-sidebar-subitem ${
                  isActive("/admin/users/add") ? "active-sub" : ""
                }`}
              >
                <FaPlus className="admin-sidebar-subicon" />
                <span>Add User</span>
              </Link>

              <Link
                to="/admin/users/view"
                className={`admin-sidebar-subitem ${
                  isActive("/admin/users/view") ? "active-sub" : ""
                }`}
              >
                <FaList className="admin-sidebar-subicon" />
                <span>View Users</span>
              </Link>
            </div>
          )}
        </div>

        <Link
          to="/admin/cart"
          className={`admin-sidebar-item ${isActive("/admin/cart") ? "active-plain" : ""}`}
        >
          <span className="admin-sidebar-item-left">
            <FaShoppingCart className="admin-sidebar-icon" />
            <span>Cart</span>
          </span>
        </Link>

        <Link
          to="/admin/orders"
          className={`admin-sidebar-item ${isActive("/admin/orders") ? "active-plain" : ""}`}
        >
          <span className="admin-sidebar-item-left">
            <FaClipboardList className="admin-sidebar-icon" />
            <span>Orders</span>
          </span>
        </Link>

        <Link
  to="/admin/support"
  className={`admin-sidebar-item ${
    isActive("/admin/support") ? "active-plain" : ""
  }`}
>
  <span className="admin-sidebar-item-left">
    <FaHeadset className="admin-sidebar-icon" />
    <span>Support</span>
  </span>
</Link>
      </div>

      <div className="admin-sidebar-logout">
  <button
    type="button"
    className="admin-sidebar-item logout-btn"
    onClick={handleLogout}
  >
    <span className="admin-sidebar-item-left">
      <FaAngleDoubleLeft className="admin-sidebar-icon" />
      <span>Logout</span>
    </span>
  </button>
</div>
      <div className="admin-sidebar-bottom-line" />

    </aside>
  );
};

export default AdminSidebar;
