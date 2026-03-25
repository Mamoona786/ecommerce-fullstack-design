import React from "react";

function CartCouponCard({ coupon, setCoupon, onApply }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onApply();
  };

  return (
    <div className="cart-sidebar-card cart-coupon-card">
      <h3 className="cart-coupon-title">Have a coupon?</h3>

      <form className="cart-coupon-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="cart-coupon-input"
          placeholder="Add coupon"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />
        <button type="submit" className="cart-coupon-btn">
          Apply
        </button>
      </form>
    </div>
  );
}

export default CartCouponCard;
