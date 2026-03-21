import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Header from "../components/layout/Header";
import CartItem from "../components/cart/CartItem";
import CartCouponCard from "../components/cart/CartCouponCard";
import CartSummaryCard from "../components/cart/CartSummaryCard";
import CartBenefitsRow from "../components/cart/CartBenefitsRow";
import SavedForLaterSection from "../components/cart/SavedForLaterSection";
import ProductDiscountBanner from "../components/common/ProductDiscountBanner";
import FooterSection from "../components/common/FooterSection";
import "../styles/cart.css";

import tshirtImg from "../assets/recommended-tshirt.png";
import backpackImg from "../assets/recommended-backpack.png";
import coffeeMakerImg from "../assets/coffee-maker.png";

const initialCartItems = [
  {
    id: 1,
    title: "T-shirts with multiple colors, for men and lady",
    details: "Size: medium, Color: blue,  Material: Plastic",
    seller: "Artel Market",
    image: tshirtImg,
    price: 78.99,
    quantity: 9,
  },
  {
    id: 2,
    title: "T-shirts with multiple colors, for men and lady",
    details: "Size: medium, Color: blue,  Material: Plastic",
    seller: "Best factory LLC",
    image: backpackImg,
    price: 39.0,
    quantity: 3,
  },
  {
    id: 3,
    title: "T-shirts with multiple colors, for men and lady",
    details: "Size: medium, Color: blue,  Material: Plastic",
    seller: "Artel Market",
    image: coffeeMakerImg,
    price: 170.5,
    quantity: 1,
  },
];

function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [coupon, setCoupon] = useState("");

  const handleQuantityChange = (id, value) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Number(value) } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleRemoveAll = () => {
    setCartItems([]);
  };

  const pricing = useMemo(() => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const discount = cartItems.length > 0 ? 60 : 0;
    const tax = cartItems.length > 0 ? 14 : 0;
    const total = subtotal - discount + tax;

    return { subtotal, discount, tax, total };
  }, [cartItems]);

  return (
    <div className="cart-page">
      <Header />

      <main className="cart-main">
        <div className="container">
          <h1 className="cart-page-title">My cart ({cartItems.length})</h1>

          <div className="cart-layout">
            <section className="cart-items-card">
              {cartItems.length > 0 ? (
                <>
                  <div className="cart-items-list">
                    {cartItems.map((item, index) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        isLast={index === cartItems.length - 1}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemoveItem}
                      />
                    ))}
                  </div>

                  <div className="cart-actions-row">
                    <Link to="/products" className="cart-back-btn">
                      <FiArrowLeft />
                      <span>Back to shop</span>
                    </Link>

                    <button
                      type="button"
                      className="cart-remove-all-btn"
                      onClick={handleRemoveAll}
                    >
                      Remove all
                    </button>
                  </div>
                </>
              ) : (
                <div className="cart-empty-state">
                  <h2>Your cart is empty</h2>
                  <p>Add products to continue shopping.</p>
                  <Link to="/products" className="cart-back-btn">
                    <FiArrowLeft />
                    <span>Back to shop</span>
                  </Link>
                </div>
              )}
            </section>

            <aside className="cart-sidebar">
              <CartCouponCard coupon={coupon} setCoupon={setCoupon} />
              <CartSummaryCard pricing={pricing} />
            </aside>
          </div>

          <CartBenefitsRow />
          <SavedForLaterSection />
          <ProductDiscountBanner />
        </div>
      </main>
      <FooterSection />
    </div>
  );
}

export default Cart;
