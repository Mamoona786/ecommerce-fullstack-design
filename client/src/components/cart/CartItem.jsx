import React from "react";

function CartItem({ item, isLast, onQuantityChange, onRemove }) {
  const isOutOfStock = item.stock === 0;
  const insufficientStock = item.quantity > item.stock && item.stock > 0;
  const productName = item.name || item.title;

  return (
    <div className={`cart-item ${isLast ? "last" : ""} ${isOutOfStock ? "opacity-50" : ""}`}>
      <div className="cart-item-image">
        <img src={item.image} alt={productName} />
      </div>

      <div className="cart-item-details">
        <h6 className={isOutOfStock ? "text-decoration-line-through" : ""}>
          {productName}
        </h6>

        {isOutOfStock ? (
          <span className="text-danger fw-bold text-decoration-line-through">
            Out of Stock
          </span>
        ) : insufficientStock ? (
          <span className="text-warning fw-bold">
            Only {item.stock} left
          </span>
        ) : (
          <span className="text-success fw-bold">In Stock</span>
        )}

        <p>${Number(item.price || 0).toFixed(2)}</p>

        <div className="cart-item-actions">
          <select
            value={item.quantity}
            onChange={(e) => onQuantityChange(item.product || item.id, e.target.value)}
            disabled={isOutOfStock}
          >
            {[...Array(Math.max(item.stock, 1)).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                Qty: {num + 1}
              </option>
            ))}
          </select>

          <button type="button" onClick={() => onRemove(item.product || item.id)}>
            Remove
          </button>
        </div>

        {insufficientStock && (
          <p className="text-warning mt-2">
            Your selected quantity exceeds available stock. Please reduce quantity.
          </p>
        )}
      </div>
    </div>
  );
}

export default CartItem;
