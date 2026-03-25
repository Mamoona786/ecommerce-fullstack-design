import React from "react";
import { IoChevronDownOutline } from "react-icons/io5";

function CartItem({ item, isLast, onQuantityChange, onRemove }) {
  const safePrice = Number(item.price) || 0;

  return (
    <article className={`cart-item ${isLast ? "cart-item-last" : ""}`}>
      <div className="cart-item-left">
        <div className="cart-item-image-wrap">
          <img src={item.image} alt={item.title} className="cart-item-image" />
        </div>

        <div className="cart-item-content">
          <h3 className="cart-item-title">{item.title}</h3>
          <p className="cart-item-details">{item.details}</p>
          <p className="cart-item-seller">Seller: {item.seller}</p>

          <div className="cart-item-buttons">
            <button
              type="button"
              className="cart-item-remove-btn"
              onClick={() => onRemove(item.product || item.id)}
            >
              Remove
            </button>

            <button type="button" className="cart-item-save-btn">
              Save for later
            </button>
          </div>
        </div>
      </div>

      <div className="cart-item-right">
        <p className="cart-item-price">${safePrice.toFixed(2)}</p>

        <div className="cart-qty-select-wrap">
          <select
            value={item.quantity}
            onChange={(e) =>
              onQuantityChange(item.product || item.id, e.target.value)
            }
            className="cart-qty-select"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((q) => (
              <option key={q} value={q}>
                Qty: {q}
              </option>
            ))}
          </select>
          <IoChevronDownOutline className="cart-qty-chevron" />
        </div>
      </div>
    </article>
  );
}

export default CartItem;
