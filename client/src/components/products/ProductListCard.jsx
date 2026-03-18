import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaStar, FaRegStar } from "react-icons/fa";

const ProductListCard = ({ product }) => {
  return (
    <article className="product-list-card">
      <Link
        to={`/products/${product.id}`}
        className="product-list-image-wrap"
      >
        <img
          src={product.image}
          alt={product.title}
          className="product-list-image"
        />
      </Link>

      <div className="product-list-body">
        <div className="product-list-top">
          <Link to={`/products/${product.id}`} className="product-list-title-link">
            <h3 className="product-list-title">{product.title}</h3>
          </Link>

          <button className="product-fav-btn" type="button">
            <FaHeart />
          </button>
        </div>

        <div className="product-price-row">
          <span className="product-price">{product.price}</span>
          {product.oldPrice && (
            <span className="product-old-price">{product.oldPrice}</span>
          )}
        </div>

        <div className="product-meta-row">
          <div className="product-stars">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaRegStar />
          </div>

          <span className="product-rating">{product.rating}</span>
          <span className="product-dot">•</span>
          <span className="product-orders">{product.orders}</span>
          <span className="product-dot">•</span>
          <span className="product-shipping">{product.shipping}</span>
        </div>

        <p className="product-description">{product.description}</p>

        <Link to={`/products/${product.id}`} className="product-details-link">
          View details
        </Link>
      </div>
    </article>
  );
};

export default ProductListCard;
