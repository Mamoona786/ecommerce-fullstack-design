import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaStar, FaRegStar } from "react-icons/fa";

const formatCurrency = (value) => `$${Number(value || 0).toFixed(2)}`;

const ProductGridCard = ({ product }) => {
  const productId = product._id || product.id;
  const productName = product.name || product.title;

  return (
    <article className="product-grid-card">
      <Link to={`/products/${productId}`} className="product-grid-image-wrap">
        <img
          src={product.image}
          alt={productName}
          className="product-grid-image"
        />
      </Link>

      <div className="product-grid-body">
        <div className="product-grid-top">
          <div className="product-grid-price-wrap">
            <span className="product-grid-price">{formatCurrency(product.price)}</span>
            {Number(product.oldPrice || 0) > 0 ? (
              <span className="product-grid-old-price">
                {formatCurrency(product.oldPrice)}
              </span>
            ) : null}
          </div>

          <button type="button" className="product-fav-btn">
            <FaHeart />
          </button>
        </div>

        <Link to={`/products/${productId}`} className="product-grid-title-link">
          <h3 className="product-grid-title">{productName}</h3>
        </Link>

        <div className="product-grid-meta">
          <div className="product-stars">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaRegStar />
          </div>
          <span className="product-rating">{product.rating}</span>
        </div>
      </div>
    </article>
  );
};

export default ProductGridCard;
