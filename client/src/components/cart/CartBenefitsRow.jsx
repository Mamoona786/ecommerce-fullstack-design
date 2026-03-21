import React from "react";
import { FiLock, FiMessageSquare, FiTruck } from "react-icons/fi";

const benefits = [
  {
    id: 1,
    icon: <FiLock />,
    title: "Secure payment",
    text: "Have you ever finally just",
  },
  {
    id: 2,
    icon: <FiMessageSquare />,
    title: "Customer support",
    text: "Have you ever finally just",
  },
  {
    id: 3,
    icon: <FiTruck />,
    title: "Free delivery",
    text: "Have you ever finally just",
  },
];

function CartBenefitsRow() {
  return (
    <section className="cart-benefits-row">
      {benefits.map((benefit) => (
        <article className="cart-benefit-item" key={benefit.id}>
          <div className="cart-benefit-icon">{benefit.icon}</div>

          <div className="cart-benefit-content">
            <h3 className="cart-benefit-title">{benefit.title}</h3>
            <p className="cart-benefit-text">{benefit.text}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

export default CartBenefitsRow;
