import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import FooterSection from "../components/common/FooterSection";
import { getMyOrders } from "../services/cartService";
import "../styles/myOrders.css";

function MyOrders() {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!isAuthenticated) {
          alert("Please login first to view your orders.");
          navigate("/login");
          return;
        }

        setLoading(true);
        const data = await getMyOrders();
        setOrders(data?.orders || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, navigate]);

  return (
    <div className="my-orders-page">
      <Header />

      <main className="my-orders-main">
        <div className="container">
          <h1 className="my-orders-title">My Orders</h1>

          {loading ? (
            <div className="my-orders-empty">
              <h2>Loading orders...</h2>
            </div>
          ) : orders.length === 0 ? (
            <div className="my-orders-empty">
              <h2>No orders found</h2>
              <p>You have not placed any orders yet.</p>
              <Link to="/products" className="my-orders-shop-btn">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="my-orders-list">
              {orders.map((order) => (
                <div key={order._id} className="my-orders-card">
                  <div className="my-orders-card-top">
                    <div>
                      <p className="my-orders-label">Order ID</p>
                      <h3>{order._id}</h3>
                    </div>

                    <div>
                      <p className="my-orders-label">Status</p>
                      <span className={`order-status-badge status-${order.status}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="my-orders-card-middle">
                    <div className="my-orders-meta">
                      <span>
                        <strong>Date:</strong>{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                      <span>
                        <strong>Total:</strong> ${Number(order.total || 0).toFixed(2)}
                      </span>
                      <span>
                        <strong>Payment:</strong>{" "}
                        {order.paymentInfo?.method || "N/A"}
                      </span>
                      <span>
                        <strong>Items:</strong> {order.items?.length || 0}
                      </span>
                    </div>

                    <div className="my-orders-items-preview">
                      {order.items?.slice(0, 3).map((item) => (
                        <div key={item._id} className="my-orders-preview-item">
                          <img src={item.image} alt={item.title} />
                          <div>
                            <p>{item.title}</p>
                            <span>
                              Qty: {item.quantity} | ${Number(item.price).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="my-orders-card-actions">
                    <Link
                      to={`/orders/${order._id}`}
                      className="my-orders-view-btn"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <FooterSection />
    </div>
  );
}

export default MyOrders;
