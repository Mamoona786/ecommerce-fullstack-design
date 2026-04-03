import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, Navigate, Link } from "react-router-dom";
import Header from "../components/layout/Header";
import FooterSection from "../components/common/FooterSection";
import "../styles/checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const cartItems = location.state?.cartItems || [];
  const pricing = location.state?.pricing || null;
  const discountValue = location.state?.discountValue || 0;

  const [formData, setFormData] = useState({
    fullName: "Mamoon Ghania",
    email: "mamoonaghania786@gmail.com",
    phone: "03147066688",
    address: "COMSATS University Islamabad, Lahore Campus",
    city: "Lahore",
    postalCode: "54000",
    country: "Pakistan",
  });

  const itemCount = useMemo(
    () => cartItems.reduce((acc, item) => acc + Number(item.quantity || 1), 0),
    [cartItems]
  );

  const updatedPricing = useMemo(() => {
    const subtotal = Number(pricing?.subtotal || 0);
    const shipping = 5;
    const discount = Number(discountValue || 0);
    const total = subtotal + shipping - discount;

    return {
      ...pricing,
      subtotal,
      shipping,
      total,
    };
  }, [pricing, discountValue]);

  if (!cartItems.length || !pricing) {
    return <Navigate to="/cart" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContinue = (e) => {
    e.preventDefault();

    const { fullName, email, phone, address, city, postalCode, country } = formData;

    if (!fullName || !email || !phone || !address || !city || !postalCode || !country) {
      alert("Please fill all checkout fields.");
      return;
    }

    navigate("/payment", {
      state: {
        cartItems,
        pricing: updatedPricing,
        discountValue,
        shippingAddress: formData,
      },
    });
  };

  return (
    <div className="checkout-page">
      <Header />

      <main className="checkout-main">
        <div className="container checkout-container">
          <section className="checkout-steps">
            <div className="checkout-step active">
              <div className="checkout-step-line active-line" />
              <div className="checkout-step-circle active">1</div>
              <p>Checkout</p>
            </div>

            <div className="checkout-step">
              <div className="checkout-step-line" />
              <div className="checkout-step-circle">2</div>
              <p>Payment Method</p>
            </div>

            <div className="checkout-step">
              <div className="checkout-step-line" />
              <div className="checkout-step-circle">3</div>
              <p>Confirmation</p>
            </div>
          </section>

          <div className="checkout-topbar">
            <div className="checkout-title-wrap">
              <h1 className="checkout-title">Checkout</h1>
              <span className="checkout-badge">{itemCount} item</span>
            </div>

            <Link to="/products" className="checkout-continue-shopping">
              <span>–</span> Continue shopping
            </Link>
          </div>

          <div className="checkout-divider" />

          <div className="checkout-layout">
            <form id="checkout-form" className="checkout-form-card" onSubmit={handleContinue}>
              <h2 className="checkout-card-title">Shipping details</h2>

              <div className="checkout-field full-width">
                <label htmlFor="fullName">Full name</label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  placeholder="Full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="checkout-form-grid">
                <div className="checkout-field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="phone">Phone (optional)</label>
                  <input
                    id="phone"
                    type="text"
                    name="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="checkout-field full-width">
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="checkout-form-grid">
                <div className="checkout-field">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="postalCode">Postal code</label>
                  <input
                    id="postalCode"
                    type="text"
                    name="postalCode"
                    placeholder="Postal code"
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="checkout-field full-width">
                <label htmlFor="country">Country</label>
                <input
                  id="country"
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
            </form>

            <aside className="checkout-summary-card">
              <h2 className="checkout-card-title">Order summary</h2>

              {cartItems.map((item) => (
                <div key={item.product || item.id} className="checkout-summary-product">
                  <div className="checkout-summary-product-left">
                    <div className="checkout-summary-product-thumb">
                      <img
                        src={
                          item.image ||
                          item.images?.[0] ||
                          "https://via.placeholder.com/56x56?text=Item"
                        }
                        alt={item.title || item.name}
                      />
                    </div>

                    <div className="checkout-summary-product-info">
                      <h4>{item.title || item.name}</h4>
                      <p>Qty: {item.quantity}</p>
                    </div>
                  </div>

                  <strong className="checkout-summary-price">
                    $ {Number(item.price * item.quantity).toLocaleString()}
                  </strong>
                </div>
              ))}

              <div className="checkout-promo-row">
                <input type="text" placeholder="Promo code" />
                <button type="button">Apply</button>
              </div>

              <div className="checkout-summary-divider" />

              <div className="checkout-summary-line">
                <span>Subtotal</span>
                <strong>$ {updatedPricing.subtotal.toLocaleString()}</strong>
              </div>

              <div className="checkout-summary-line">
                <span>Shipping</span>
                <strong>$ {updatedPricing.shipping.toLocaleString()}</strong>
              </div>

              {discountValue > 0 && (
                <div className="checkout-summary-line">
                  <span>Discount</span>
                  <strong>- $ {Number(discountValue).toLocaleString()}</strong>
                </div>
              )}

              <div className="checkout-summary-total">
                <span>Total</span>
                <strong>$ {updatedPricing.total.toLocaleString()}</strong>
              </div>

              <button
                type="submit"
                form="checkout-form"
                className="checkout-pay-btn"
              >
                Proceed to Payment
              </button>
            </aside>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}

export default Checkout;
