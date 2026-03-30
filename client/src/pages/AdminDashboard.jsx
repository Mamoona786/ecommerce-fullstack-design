import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import FooterSection from "../components/common/FooterSection";
import {
  getAdminOrders,
  getAdminProducts,
  getAdminStats,
  getAdminUsers,
} from "../services/adminService";
import "../styles/admin.css";

const formatCurrency = (value) => `$${Number(value || 0).toFixed(2)}`;

const formatDate = (value) => {
  if (!value) return "N/A";
  return new Date(value).toLocaleString();
};

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const adminUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (error) {
      return null;
    }
  }, []);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        setError("");

        const [statsData, usersData, productsData, ordersData] = await Promise.all([
          getAdminStats(),
          getAdminUsers(),
          getAdminProducts(),
          getAdminOrders(),
        ]);

        setStats(statsData);
        setUsers(usersData?.users || []);
        setProducts(productsData?.products || []);
        setOrders(ordersData?.orders || []);
      } catch (err) {
        console.error("Failed to load admin dashboard:", err);

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }

        if (err.response?.status === 403) {
          navigate("/");
          return;
        }

        setError(err.response?.data?.message || "Failed to load admin dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [navigate]);

  return (
    <div className="admin-page">
      <Header />

      <main className="admin-main">
        <div className="container">
          <div className="admin-topbar">
            <div>
              <h1 className="admin-page-title">Admin Dashboard</h1>
              <p className="admin-page-subtitle">
                Welcome, {adminUser?.username || "Admin"}
              </p>
            </div>
          </div>

          {loading && <p>Loading dashboard...</p>}
          {error && <p className="admin-error">{error}</p>}

          {!loading && !error && (
            <>
              <section className="admin-stats-grid">
                <div className="admin-stat-card">
                  <h3>Total Users</h3>
                  <p>{stats?.usersCount || 0}</p>
                </div>

                <div className="admin-stat-card">
                  <h3>Total Products</h3>
                  <p>{stats?.productsCount || 0}</p>
                </div>

                <div className="admin-stat-card">
                  <h3>Total Orders</h3>
                  <p>{stats?.ordersCount || 0}</p>
                </div>

                <div className="admin-stat-card">
                  <h3>Total Revenue</h3>
                  <p>{formatCurrency(stats?.totalRevenue || 0)}</p>
                </div>
              </section>

              <section className="admin-section">
                <div className="admin-section-header">
                  <h2>Recent Orders</h2>
                </div>

                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>User</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 8).map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.user?.username || order.user?.email || "N/A"}</td>
                          <td>{order.status}</td>
                          <td>{formatCurrency(order.total)}</td>
                          <td>{formatDate(order.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="admin-grid-2">
                <div className="admin-section">
                  <div className="admin-section-header">
                    <h2>Users</h2>
                  </div>

                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="admin-section">
                  <div className="admin-section-header">
                    <h2>Products</h2>
                  </div>

                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Stock</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.category?.category_name || "N/A"}</td>
                            <td>{product.stock}</td>
                            <td>{formatCurrency(product.price)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </main>

      <FooterSection />
    </div>
  );
}

export default AdminDashboard;
