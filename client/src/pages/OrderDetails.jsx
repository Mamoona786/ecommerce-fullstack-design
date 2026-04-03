import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import FooterSection from "../components/common/FooterSection";
import { getOrderById } from "../services/cartService";
import "../styles/orderDetails.css";

function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!isAuthenticated) {
          alert("Please login first to view order details.");
          navigate("/login");
          return;
        }

        setLoading(true);
        const data = await getOrderById(orderId);
        setOrder(data?.order || null);
      } catch (error) {
        console.error("Failed to fetch order details:", error);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="order-details-page">
        <Header />
        <main className="order-details-main">
          <div className="container">
            <div className="order-details-card">
              <h1>Loading order details...</h1>
            </div>
          </div>
        </main>
        <FooterSection />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-details-page">
        <Header />
        <main className="order-details-main">
          <div className="container">
            <div className="order-details-card">
              <h1>Order not found</h1>
              <p>We could not load this order.</p>
              <Link to="/my-orders" className="order-details-btn">
                Back to My Orders
              </Link>
            </div>
          </div>
        </main>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="order-details-page">
      <Header />

      <main className="order-details-main">
        <div className="container">
          <div className="order-details-card">
            <div className="order-details-header">
              <div>
                <h1>Order Details</h1>
                <p>Order ID: {order._id}</p>
              </div>

              <span className={`order-status-badge status-${order.status}`}>
                {order.status}
              </span>
            </div>

            <div className="order-details-grid">
              <section className="order-details-section">
                <h2>Shipping Information</h2>
                <div className="order-info-list">
                  <p><strong>Name:</strong> {order.shippingAddress?.fullName}</p>
                  <p><strong>Email:</strong> {order.shippingAddress?.email}</p>
                  <p><strong>Phone:</strong> {order.shippingAddress?.phone}</p>
                  <p><strong>Address:</strong> {order.shippingAddress?.address}</p>
                  <p><strong>City:</strong> {order.shippingAddress?.city}</p>
                  <p><strong>Postal Code:</strong> {order.shippingAddress?.postalCode}</p>
                  <p><strong>Country:</strong> {order.shippingAddress?.country}</p>
                </div>
              </section>

              <section className="order-details-section">
                <h2>Payment & Summary</h2>
                <div className="order-info-list">
                  <p><strong>Payment Method:</strong> {order.paymentInfo?.method}</p>
                  <p><strong>Payment Status:</strong> {order.paymentInfo?.status}</p>
                  <p><strong>Subtotal:</strong> ${Number(order.subtotal || 0).toFixed(2)}</p>
                  <p><strong>Discount:</strong> ${Number(order.discount || 0).toFixed(2)}</p>
                  <p><strong>Tax:</strong> ${Number(order.tax || 0).toFixed(2)}</p>
                  <p><strong>Total:</strong> ${Number(order.total || 0).toFixed(2)}</p>
                  <p>
                    <strong>Placed On:</strong>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </section>
            </div>

            <section className="order-details-section order-items-section">
              <h2>Ordered Items</h2>

              <div className="order-items-list">
                {order.items?.map((item) => (
                  <div key={item._id} className="order-item-card">
                    <div className="order-item-image">
                      <img src={item.image} alt={item.title} />
                    </div>

                    <div className="order-item-content">
                      <h3>{item.title}</h3>
                      <p><strong>Seller:</strong> {item.seller || "N/A"}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                      <p><strong>Price:</strong> ${Number(item.price).toFixed(2)}</p>
                      <p>
                        <strong>Total:</strong> $
                        {(Number(item.price) * Number(item.quantity)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="order-details-actions">
              <Link to="/my-orders" className="order-details-btn secondary">
                Back to My Orders
              </Link>

              <Link to="/products" className="order-details-btn">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}

export default OrderDetails;
