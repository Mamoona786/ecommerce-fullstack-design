import React from "react";

const americanExpress = "/american-express.png";
const masterCard = "/master-card.png";
const paypal = "/paypal.png";
const visa = "/visa.png";
const applePay = "/apple-pay.png";

function CartSummaryCard({ pricing, onCheckout, checkingOut = false }) {
  return (
    <div className="cart-sidebar-card cart-summary-card">
      <div className="cart-summary-rows">
        <div className="cart-summary-row">
          <span>Subtotal:</span>
          <span>${pricing.subtotal.toFixed(2)}</span>
        </div>

        <div className="cart-summary-row">
          <span>Discount:</span>
          <span className="cart-summary-discount">
            - ${pricing.discount.toFixed(2)}
          </span>
        </div>

        <div className="cart-summary-row">
          <span>Tax:</span>
          <span className="cart-summary-tax">+ ${pricing.tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="cart-summary-divider" />

      <div className="cart-summary-total-row">
        <span>Total:</span>
        <strong>${pricing.total.toFixed(2)}</strong>
      </div>

      <button
        type="button"
        className="cart-checkout-btn"
        onClick={onCheckout}
        disabled={checkingOut}
      >
        {checkingOut ? "Processing..." : "Checkout"}
      </button>

      <div className="cart-payment-methods">
        <img src={americanExpress} alt="American Express" />
        <img src={masterCard} alt="MasterCard" />
        <img src={paypal} alt="PayPal" />
        <img src={visa} alt="Visa" />
        <img src={applePay} alt="Apple Pay" />
      </div>
    </div>
  );
}

export default CartSummaryCard;
