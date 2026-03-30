import React, { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import { getAdminOrders } from "../../../services/adminService";

const formatCurrency = (value) => `$${Number(value || 0).toFixed(2)}`;

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getAdminOrders();
        setOrders(data?.orders || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <AdminLayout>
      <div className="admin-dashboard-page">
        <div className="admin-dashboard-header">
          <h1>Orders</h1>
          <p>Manage all customer orders from here.</p>
        </div>

        {loading && <p>Loading orders...</p>}
        {error && <p className="admin-dashboard-error">{error}</p>}

        {!loading && !error && (
          <section className="admin-dashboard-section">
            <h2>All Orders</h2>

            <div className="admin-dashboard-table-wrap">
              <table className="admin-dashboard-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>User</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.user?.username || order.user?.email || "N/A"}</td>
                      <td>{order.items?.length || 0}</td>
                      <td>{formatCurrency(order.total)}</td>
                      <td>{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
