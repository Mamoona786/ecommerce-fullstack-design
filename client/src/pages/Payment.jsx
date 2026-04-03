import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, Navigate, Link } from "react-router-dom";
import Header from "../components/layout/Header";
import FooterSection from "../components/common/FooterSection";
import { checkoutCart } from "../services/cartService";
import "../styles/payment.css";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const cartItems = location.state?.cartItems || [];
  const pricing = location.state?.pricing || null;
  const discountValue = location.state?.discountValue || 0;
  const shippingAddress = location.state?.shippingAddress || null;

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);

  const [cardData, setCardData] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiry: "",
    cvv: "",
  });

  const itemCount = useMemo(
    () => cartItems.reduce((acc, item) => acc + Number(item.quantity || 1), 0),
    [cartItems]
  );

  if (!cartItems.length || !pricing || !shippingAddress) {
    return <Navigate to="/cart" replace />;
  }

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 4);

    if (cleaned.length <= 2) return cleaned;
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
  };

  const formatCvv = (value) => {
    return value.replace(/\D/g, "").slice(0, 3);
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value);
    }

    if (name === "expiry") {
      formattedValue = formatExpiry(value);
    }

    if (name === "cvv") {
      formattedValue = formatCvv(value);
    }

    setCardData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handlePlaceOrder = async () => {
    try {
      if (paymentMethod === "card") {
        if (
          !cardData.cardNumber.trim() ||
          !cardData.nameOnCard.trim() ||
          !cardData.expiry.trim() ||
          !cardData.cvv.trim()
        ) {
          alert("Please fill all card details.");
          return;
        }

        if (cardData.cardNumber.replace(/\s/g, "").length !== 16) {
          alert("Card number must be 16 digits.");
          return;
        }

        if (cardData.expiry.length !== 5) {
          alert("Expiry must be in MM/YY format.");
          return;
        }

        if (cardData.cvv.length !== 3) {
          alert("CVV must be 3 digits.");
          return;
        }
      }

      setProcessing(true);

      const data = await checkoutCart({
        discount: discountValue,
        shippingAddress,
        paymentMethod,
      });

      const orderId = data?.order?._id;

      if (!orderId) {
        throw new Error("Order ID not found");
      }

      navigate(`/order-confirmation/${orderId}`);
    } catch (error) {
      console.error("Checkout failed:", error);
      alert(error?.response?.data?.message || error.message || "Checkout failed");
    } finally {
      setProcessing(false);
    }
  };

  const firstItem = cartItems[0];

  return (
    <div className="payment-page">
      <Header />

      <main className="payment-main">
        <div className="container payment-container">
          <section className="payment-steps">
            <div className="payment-step">
              <div className="payment-step-line done-line" />
              <div className="payment-step-circle">1</div>
              <p>Checkout</p>
            </div>

            <div className="payment-step active">
              <div className="payment-step-line active-line" />
              <div className="payment-step-circle active">2</div>
              <p>Payment Method</p>
            </div>

            <div className="payment-step">
              <div className="payment-step-line" />
              <div className="payment-step-circle">3</div>
              <p>Confirmation</p>
            </div>
          </section>

          <div className="payment-topbar">
            <div className="payment-title-wrap">
              <h1 className="payment-title">Payment Method</h1>
              <span className="payment-badge">{itemCount} item</span>
            </div>

            <Link to="/products" className="payment-continue-shopping">
              <span>–</span> Continue shopping
            </Link>
          </div>

          <div className="payment-divider" />

          <div className="payment-layout">
            <section className="payment-method-card">
              <h2 className="payment-card-title">Select payment</h2>

              <label className="payment-radio-row">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Cash on Delivery</span>
              </label>

              <label className="payment-radio-row">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Card (demo)</span>
              </label>

              {paymentMethod === "card" && (
                <div className="payment-card-fields">
                  <div className="payment-field full-width">
                    <label htmlFor="cardNumber">Card number</label>
                    <input
                      id="cardNumber"
                      type="text"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardData.cardNumber}
                      onChange={handleCardChange}
                    />
                  </div>

                  <div className="payment-field full-width">
                    <label htmlFor="nameOnCard">Name on card</label>
                    <input
                      id="nameOnCard"
                      type="text"
                      name="nameOnCard"
                      placeholder="John Doe"
                      value={cardData.nameOnCard}
                      onChange={handleCardChange}
                    />
                  </div>

                  <div className="payment-fields-grid">
                    <div className="payment-field">
                      <label htmlFor="expiry">Expiry</label>
                      <input
                        id="expiry"
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        value={cardData.expiry}
                        onChange={handleCardChange}
                      />
                    </div>

                    <div className="payment-field">
                      <label htmlFor="cvv">CVV</label>
                      <input
                        id="cvv"
                        type="text"
                        name="cvv"
                        placeholder="123"
                        value={cardData.cvv}
                        onChange={handleCardChange}
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "cod" && (
                <div className="payment-alt-box">
                  Your order will be paid when it is delivered to your address.
                </div>
              )}

              {paymentMethod === "paypal" && (
                <div className="payment-alt-box">
                  PayPal demo mode selected. You can continue to place the order.
                </div>
              )}

              <p className="payment-shipping-note">
                Shipping to <strong>{shippingAddress.fullName}</strong>,{" "}
                {shippingAddress.address}
              </p>
            </section>

            <aside className="payment-summary-card">
              <h2 className="payment-card-title">Order summary</h2>

              <div className="payment-summary-product">
                <div className="payment-summary-product-left">
                  <div className="payment-summary-thumb">
                    <img
                      src={
                        firstItem?.image ||
                        firstItem?.images?.[0] ||
                        "https://via.placeholder.com/56x56?text=Item"
                      }
                      alt={firstItem?.title || firstItem?.name || "Product"}
                    />
                  </div>

                  <div className="payment-summary-info">
                    <h4>{firstItem?.title || firstItem?.name}</h4>
                    <p>Qty: {firstItem?.quantity || 1}</p>
                  </div>
                </div>

                <strong className="payment-summary-price">
                  ${" "}
                  {Number(
                    (firstItem?.price || 0) * (firstItem?.quantity || 1)
                  ).toLocaleString()}
                </strong>
              </div>

              <div className="payment-summary-divider" />

              <div className="payment-summary-line">
                <span>Subtotal</span>
                <strong>${" "}{Number(pricing.subtotal || 0).toLocaleString()}</strong>
              </div>

              <div className="payment-summary-line">
                <span>Shipping</span>
                <strong>${" "}{Number(pricing.shipping || 250).toLocaleString()}</strong>
              </div>

              <div className="payment-summary-total">
                <span>Total</span>
                <strong>${" "}{Number(pricing.total || 0).toLocaleString()}</strong>
              </div>

              <button
                type="button"
                className="payment-place-order-btn"
                onClick={handlePlaceOrder}
                disabled={processing}
              >
                {processing ? "Processing..." : "Place Order"}
              </button>
            </aside>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}

export default Payment;
