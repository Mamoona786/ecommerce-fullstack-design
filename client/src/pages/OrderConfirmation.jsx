import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import FooterSection from "../components/common/FooterSection";
import { getOrderById } from "../services/cartService";
import "../styles/orderConfirmation.css";

function OrderConfirmation() {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const data = await getOrderById(orderId);
        setOrder(data?.order || null);
      } catch (error) {
        console.error("Failed to fetch order:", error);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const itemCount = useMemo(() => {
    if (!order?.items?.length) return 0;
    return order.items.reduce((acc, item) => acc + Number(item.quantity || 1), 0);
  }, [order]);

  const firstItem = order?.items?.[0];

  const formattedAddress = [
    order?.shippingAddress?.address,
    order?.shippingAddress?.city,
    order?.shippingAddress?.postalCode,
    order?.shippingAddress?.country,
  ]
    .filter(Boolean)
    .join(", ");

  const paymentMethodText =
    order?.paymentInfo?.method
      ? order.paymentInfo.method.charAt(0).toUpperCase() + order.paymentInfo.method.slice(1)
      : "Card";

  if (loading) {
    return (
      <div className="order-confirmation-page">
        <Header />

        <main className="order-confirmation-main">
          <div className="container order-confirmation-container">
            <section className="order-steps">
              <div className="order-step">
                <div className="order-step-line done-line" />
                <div className="order-step-circle">1</div>
                <p>Checkout</p>
              </div>

              <div className="order-step">
                <div className="order-step-line done-line" />
                <div className="order-step-circle">2</div>
                <p>Payment Method</p>
              </div>

              <div className="order-step active">
                <div className="order-step-line active-line" />
                <div className="order-step-circle active">3</div>
                <p>Confirmation</p>
              </div>
            </section>

            <div className="order-topbar">
              <div className="order-title-wrap">
                <h1 className="order-page-title">Order Confirmation</h1>
                <span className="order-badge">Loading...</span>
              </div>

              <Link to="/products" className="order-continue-shopping">
                <span>–</span> Continue shopping
              </Link>
            </div>

            <div className="order-divider" />

            <div className="order-layout single-column">
              <section className="order-confirmation-card order-confirmation-card-centered">
                <div className="order-status-icon">✓</div>
                <h2 className="order-confirmation-title">Loading order...</h2>
                <p className="order-confirmation-subtitle">
                  Please wait while we load your order details.
                </p>
              </section>
            </div>
          </div>
        </main>

        <FooterSection />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-confirmation-page">
        <Header />

        <main className="order-confirmation-main">
          <div className="container order-confirmation-container">
            <section className="order-steps">
              <div className="order-step">
                <div className="order-step-line done-line" />
                <div className="order-step-circle">1</div>
                <p>Checkout</p>
              </div>

              <div className="order-step">
                <div className="order-step-line done-line" />
                <div className="order-step-circle">2</div>
                <p>Payment Method</p>
              </div>

              <div className="order-step active">
                <div className="order-step-line active-line" />
                <div className="order-step-circle active">3</div>
                <p>Confirmation</p>
              </div>
            </section>

            <div className="order-topbar">
              <div className="order-title-wrap">
                <h1 className="order-page-title">Order Confirmation</h1>
                <span className="order-badge">0 items</span>
              </div>

              <Link to="/products" className="order-continue-shopping">
                <span>–</span> Continue shopping
              </Link>
            </div>

            <div className="order-divider" />

            <div className="order-layout single-column">
              <section className="order-confirmation-card order-confirmation-card-centered">
                <div className="order-status-icon error">!</div>
                <h2 className="order-confirmation-title">Order not found</h2>
                <p className="order-confirmation-subtitle">
                  We could not load your order details.
                </p>

                <div className="order-actions centered">
                  <Link to="/products" className="order-primary-btn">
                    Continue Shopping
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </main>

        <FooterSection />
      </div>
    );
  }

  return (
    <div className="order-confirmation-page">
      <Header />

      <main className="order-confirmation-main">
        <div className="container order-confirmation-container">
          <section className="order-steps">
            <div className="order-step">
              <div className="order-step-line done-line" />
              <div className="order-step-circle">1</div>
              <p>Checkout</p>
            </div>

            <div className="order-step">
              <div className="order-step-line done-line" />
              <div className="order-step-circle">2</div>
              <p>Payment Method</p>
            </div>

            <div className="order-step active">
              <div className="order-step-line active-line" />
              <div className="order-step-circle active">3</div>
              <p>Confirmation</p>
            </div>
          </section>

          <div className="order-topbar">
            <div className="order-title-wrap">
              <h1 className="order-page-title">Order Confirmation</h1>
              <span className="order-badge">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            </div>

            <Link to="/products" className="order-continue-shopping">
              <span>–</span> Continue shopping
            </Link>
          </div>

          <div className="order-divider" />

          <div className="order-layout single-column">
            <section className="order-confirmation-card order-confirmation-card-centered">
              <div className="order-status-icon">✓</div>

              <h2 className="order-confirmation-title">Thank you!</h2>
              <p className="order-confirmation-subtitle">
                Your order has been placed succesfully.
              </p>

              <p className="order-id-text">
                Order ID: <strong>{order._id}</strong>
              </p>

              {firstItem && (
                <div className="order-summary-inline-card">
                  <div className="order-summary-product">
                    <div className="order-summary-product-left">
                      <div className="order-summary-thumb">
                        <img
                          src={
                            firstItem.image ||
                            firstItem.images?.[0] ||
                            "https://via.placeholder.com/56x56?text=Item"
                          }
                          alt={firstItem.title || "Product"}
                        />
                      </div>

                      <div className="order-summary-info">
                        <h4>{firstItem.title}</h4>
                        <p>Qty: {firstItem.quantity || 1}</p>
                      </div>
                    </div>

                    <strong className="order-summary-price">
                      Rs.{" "}
                      {Number(
                        (firstItem.price || 0) * (firstItem.quantity || 1)
                      ).toLocaleString()}
                    </strong>
                  </div>

                  <div className="order-summary-divider" />

                  <div className="order-summary-line">
                    <span>Subtotal</span>
                    <strong>Rs. {Number(order.subtotal || 0).toLocaleString()}</strong>
                  </div>

                  <div className="order-summary-line">
                    <span>Shipping</span>
                    <strong>
                      Rs. {Number(order.shippingFee || 250).toLocaleString()}
                    </strong>
                  </div>

                  <div className="order-summary-total">
                    <span>Total</span>
                    <strong>Rs. {Number(order.total || 0).toLocaleString()}</strong>
                  </div>
                </div>
              )}

              <div className="order-bottom-info">
                <div className="order-bottom-box">
                  <div className="order-bottom-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <path d="M3.3 7l8.7 5 8.7-5" />
                      <path d="M12 22V12" />
                    </svg>
                  </div>

                  <div className="order-bottom-content">
                    <h3>Shipping Address</h3>
                    <p>{order.shippingAddress?.fullName || "N/A"}</p>
                    <p>{formattedAddress || "N/A"}</p>
                  </div>
                </div>

                <div className="order-bottom-box">
                  <div className="order-bottom-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                  </div>

                  <div className="order-bottom-content">
                    <h3>Payment Method</h3>
                    <p>
                      {paymentMethodText}
                      {order.paymentInfo?.last4
                        ? ` (ending ${order.paymentInfo.last4})`
                        : ""}
                    </p>
                    <p>{order.shippingAddress?.fullName || "N/A"}</p>
                  </div>
                </div>

                <div className="order-bottom-box">
                  <div className="order-bottom-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>

                  <div className="order-bottom-content">
                    <h3>Estimated Delivery</h3>
                    <p>3 - 5 business days</p>
                    <p>You will receive a confirmation email with tracking details.</p>
                  </div>
                </div>
              </div>

              <div className="order-actions centered">
                <Link to="/products" className="order-primary-btn">
                  Continue Shopping
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}

export default OrderConfirmation;
