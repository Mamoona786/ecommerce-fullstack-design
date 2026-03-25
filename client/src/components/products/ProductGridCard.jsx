import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaStar, FaRegStar } from "react-icons/fa";

const ProductGridCard = ({ product }) => {
  return (
    <article className="product-grid-card">
      <Link to={`/products/${product._id}`} className="product-grid-image-wrap">
        <img
          src={product.image}
          alt={product.title}
          className="product-grid-image"
        />
      </Link>

      <div className="product-grid-body">
        <div className="product-grid-top">
          <div className="product-grid-price-wrap">
            <span className="product-grid-price">{product.price}</span>
            {product.oldPrice ? (
              <span className="product-grid-old-price">{product.oldPrice}</span>
            ) : null}
          </div>

          <button type="button" className="product-fav-btn">
            <FaHeart />
          </button>
        </div>

        <Link to={`/products/${product._id}`} className="product-grid-title-link">
          <h3 className="product-grid-title">{product.title}</h3>
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
