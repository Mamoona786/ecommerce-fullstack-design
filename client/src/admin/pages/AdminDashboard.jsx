import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import {
  getAdminOrders,
  getAdminProducts,
  getAdminStats,
  getAdminUsers,
} from "../../services/adminService";
import "../styles/adminDashboard.css";

const formatCurrency = (value) => `$${Number(value || 0).toFixed(2)}`;

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        setError(err.response?.data?.message || "Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <AdminLayout>
      <div className="admin-dashboard-page">
        <div className="admin-dashboard-header">
          <h1>Dashboard</h1>
          <p>Welcome to your admin panel</p>
        </div>

        {loading && <p>Loading dashboard...</p>}
        {error && <p className="admin-dashboard-error">{error}</p>}

        {!loading && !error && (
          <>
            <div className="admin-dashboard-cards">
              <div className="admin-dashboard-card">
                <h3>Total Users</h3>
                <p>{stats?.usersCount || 0}</p>
              </div>

              <div className="admin-dashboard-card">
                <h3>Total Products</h3>
                <p>{stats?.productsCount || 0}</p>
              </div>

              <div className="admin-dashboard-card">
                <h3>Total Orders</h3>
                <p>{stats?.ordersCount || 0}</p>
              </div>

              <div className="admin-dashboard-card">
                <h3>Total Revenue</h3>
                <p>{formatCurrency(stats?.totalRevenue || 0)}</p>
              </div>
            </div>

            <div className="admin-dashboard-grid">
              <section className="admin-dashboard-section">
                <h2>Recent Orders</h2>
                <div className="admin-dashboard-table-wrap">
                  <table className="admin-dashboard-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Status</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 6).map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.status}</td>
                          <td>{formatCurrency(order.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="admin-dashboard-section">
                <h2>Latest Users</h2>
                <div className="admin-dashboard-table-wrap">
                  <table className="admin-dashboard-table">
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.slice(0, 6).map((user) => (
                        <tr key={user._id}>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="admin-dashboard-section admin-dashboard-section-full">
                <h2>Latest Products</h2>
                <div className="admin-dashboard-table-wrap">
                  <table className="admin-dashboard-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Stock</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.slice(0, 8).map((product) => (
                        <tr key={product._id}>
                          <td>{product.name}</td>
                          <td>{product.stock}</td>
                          <td>{formatCurrency(product.price)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
