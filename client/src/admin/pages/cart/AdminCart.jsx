import React, { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import { getAdminCarts } from "../../../services/adminService";

const formatCurrency = (value) => `$${Number(value || 0).toFixed(2)}`;

const getCartItemsCount = (items = []) => {
  return items.reduce((total, item) => total + Number(item.quantity || 0), 0);
};

const getCartTotal = (items = []) => {
  return items.reduce(
    (total, item) => total + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );
};

const AdminCart = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAdminCarts();
        setCarts(data?.carts || []);
      } catch (err) {
        console.error("Failed to fetch carts:", err);
        setError(err.response?.data?.message || "Failed to load carts");
      } finally {
        setLoading(false);
      }
    };

    fetchCarts();
  }, []);

  return (
    <AdminLayout>
      <div className="admin-dashboard-page">
        <div className="admin-dashboard-header">
          <h1>Cart</h1>
          <p>All user carts are listed below.</p>
        </div>

        <section className="admin-dashboard-section">
          <h2>Cart Management</h2>

          {loading && <p>Loading carts...</p>}
          {error && <p className="admin-dashboard-error">{error}</p>}

          {!loading && !error && (
            <div className="admin-dashboard-table-wrap">
              <table className="admin-dashboard-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Total Items</th>
                    <th>Cart Total</th>
                    <th>Last Updated</th>
                  </tr>
                </thead>

                <tbody>
                  {carts.length > 0 ? (
                    carts.map((cart, index) => (
                      <tr key={cart._id}>
                        <td>{index + 1}</td>
                        <td>{cart.user?.username || "N/A"}</td>
                        <td>{cart.user?.email || "N/A"}</td>
                        <td>{cart.status}</td>
                        <td>{getCartItemsCount(cart.items)}</td>
                        <td>{formatCurrency(getCartTotal(cart.items))}</td>
                        <td>
                          {cart.updatedAt
                            ? new Date(cart.updatedAt).toLocaleDateString()
                            : "N/A"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" style={{ textAlign: "center" }}>
                        No carts found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminCart;
