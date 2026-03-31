import React, { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import { getAdminOrders } from "../../../services/adminService";

const formatCurrency = (value) => `$${Number(value || 0).toFixed(2)}`;

const getOrderItemsCount = (items = []) => {
  return items.reduce((total, item) => total + Number(item.quantity || 0), 0);
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAdminOrders();
        setOrders(data?.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError(err.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleRow = (orderId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  return (
    <AdminLayout>
      <div className="admin-dashboard-page">
        <div className="admin-dashboard-header">
          <h1>Orders</h1>
          <p>Manage all customer orders from here.</p>
        </div>

        <section className="admin-dashboard-section">
          <h2>All Orders</h2>

          {loading && <p>Loading orders...</p>}
          {error && <p className="admin-dashboard-error">{error}</p>}

          {!loading && !error && (
            <div className="admin-dashboard-table-wrap">
              <table className="admin-dashboard-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Order ID</th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Total Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Details</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.length > 0 ? (
                    orders.map((order, index) => (
                      <React.Fragment key={order._id}>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{order._id}</td>
                          <td>{order.user?.username || "N/A"}</td>
                          <td>{order.user?.email || "N/A"}</td>
                          <td>{getOrderItemsCount(order.items)}</td>
                          <td>{formatCurrency(order.total)}</td>
                          <td>{order.status}</td>
                          <td>
                            {order.createdAt
                              ? new Date(order.createdAt).toLocaleDateString()
                              : "N/A"}
                          </td>
                          <td>
                            <button
                              type="button"
                              onClick={() => toggleRow(order._id)}
                              style={{
                                padding: "6px 12px",
                                border: "1px solid #d1d5db",
                                borderRadius: "6px",
                                background: "#fff",
                                cursor: "pointer",
                              }}
                            >
                              {expandedRows[order._id] ? "Hide" : "View"}
                            </button>
                          </td>
                        </tr>

                        {expandedRows[order._id] && (
                          <tr>
                            <td colSpan="9" style={{ background: "#f9fafb" }}>
                              <div style={{ padding: "16px" }}>
                                <h3 style={{ marginBottom: "14px" }}>
                                  Ordered Products
                                </h3>

                                {order.items?.length > 0 ? (
                                  <div style={{ overflowX: "auto" }}>
                                    <table
                                      style={{
                                        width: "100%",
                                        borderCollapse: "collapse",
                                        background: "#fff",
                                      }}
                                    >
                                      <thead>
                                        <tr>
                                          <th
                                            style={{
                                              textAlign: "left",
                                              padding: "10px",
                                              borderBottom: "1px solid #e5e7eb",
                                            }}
                                          >
                                            Image
                                          </th>
                                          <th
                                            style={{
                                              textAlign: "left",
                                              padding: "10px",
                                              borderBottom: "1px solid #e5e7eb",
                                            }}
                                          >
                                            Product
                                          </th>
                                          <th
                                            style={{
                                              textAlign: "left",
                                              padding: "10px",
                                              borderBottom: "1px solid #e5e7eb",
                                            }}
                                          >
                                            Seller
                                          </th>
                                          <th
                                            style={{
                                              textAlign: "left",
                                              padding: "10px",
                                              borderBottom: "1px solid #e5e7eb",
                                            }}
                                          >
                                            Price
                                          </th>
                                          <th
                                            style={{
                                              textAlign: "left",
                                              padding: "10px",
                                              borderBottom: "1px solid #e5e7eb",
                                            }}
                                          >
                                            Quantity
                                          </th>
                                          <th
                                            style={{
                                              textAlign: "left",
                                              padding: "10px",
                                              borderBottom: "1px solid #e5e7eb",
                                            }}
                                          >
                                            Subtotal
                                          </th>
                                        </tr>
                                      </thead>

                                      <tbody>
                                        {order.items.map((item) => (
                                          <tr key={item._id}>
                                            <td
                                              style={{
                                                padding: "10px",
                                                borderBottom: "1px solid #f1f5f9",
                                              }}
                                            >
                                              <img
                                                src={item.image}
                                                alt={item.title}
                                                style={{
                                                  width: "56px",
                                                  height: "56px",
                                                  objectFit: "cover",
                                                  borderRadius: "8px",
                                                  border: "1px solid #e5e7eb",
                                                }}
                                              />
                                            </td>
                                            <td
                                              style={{
                                                padding: "10px",
                                                borderBottom: "1px solid #f1f5f9",
                                              }}
                                            >
                                              {item.title || item.product?.name || "N/A"}
                                            </td>
                                            <td
                                              style={{
                                                padding: "10px",
                                                borderBottom: "1px solid #f1f5f9",
                                              }}
                                            >
                                              {item.seller || "N/A"}
                                            </td>
                                            <td
                                              style={{
                                                padding: "10px",
                                                borderBottom: "1px solid #f1f5f9",
                                              }}
                                            >
                                              {formatCurrency(item.price)}
                                            </td>
                                            <td
                                              style={{
                                                padding: "10px",
                                                borderBottom: "1px solid #f1f5f9",
                                              }}
                                            >
                                              {item.quantity}
                                            </td>
                                            <td
                                              style={{
                                                padding: "10px",
                                                borderBottom: "1px solid #f1f5f9",
                                              }}
                                            >
                                              {formatCurrency(
                                                Number(item.price || 0) *
                                                  Number(item.quantity || 0)
                                              )}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                ) : (
                                  <p style={{ color: "#6b7280" }}>
                                    No ordered products found.
                                  </p>
                                )}

                                <div
                                  style={{
                                    marginTop: "16px",
                                    display: "flex",
                                    gap: "18px",
                                    flexWrap: "wrap",
                                  }}
                                >
                                  <p>
                                    <strong>Subtotal:</strong>{" "}
                                    {formatCurrency(order.subtotal)}
                                  </p>
                                  <p>
                                    <strong>Discount:</strong>{" "}
                                    {formatCurrency(order.discount)}
                                  </p>
                                  <p>
                                    <strong>Tax:</strong>{" "}
                                    {formatCurrency(order.tax)}
                                  </p>
                                  <p>
                                    <strong>Total:</strong>{" "}
                                    {formatCurrency(order.total)}
                                  </p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" style={{ textAlign: "center" }}>
                        No orders found
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

export default AdminOrders;
