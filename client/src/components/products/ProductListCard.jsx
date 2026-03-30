import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaStar, FaRegStar } from "react-icons/fa";

const formatCurrency = (value) => `$${Number(value || 0).toFixed(2)}`;

const ProductListCard = ({ product }) => {
  const [isFav, setIsFav] = useState(false);

  const productId = product._id || product.id;
  const productName = product.name || product.title;
  const categoryName = product?.category?.category_name || product?.category || "";

  return (
    <article className="product-list-card">
      <Link to={`/products/${productId}`} className="product-list-image-wrap">
        <img
          src={product.image}
          alt={productName}
          className="product-list-image"
        />
      </Link>

      <div className="product-list-body">
        <div className="product-list-top">
          <Link to={`/products/${productId}`} className="product-list-title-link">
            <h3 className="product-list-title">{productName}</h3>
          </Link>

          <button
            className={`product-fav-btn ${isFav ? "product-fav-btn-active" : ""}`}
            type="button"
            onClick={() => setIsFav((prev) => !prev)}
          >
            <FaHeart />
          </button>
        </div>

        <div className="product-price-row">
          <span className="product-price">{formatCurrency(product.price)}</span>
          {Number(product.oldPrice || 0) > 0 && (
            <span className="product-old-price">{formatCurrency(product.oldPrice)}</span>
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
          <span className="product-dot">•</span>
          <span className="product-shipping">{product.stockStatus}</span>
          {categoryName ? (
            <>
              <span className="product-dot">•</span>
              <span className="product-shipping">{categoryName}</span>
            </>
          ) : null}
        </div>

        <p className="product-description">
          {product.shortDescription || product.description}
        </p>

        <Link to={`/products/${productId}`} className="product-details-link">
          View details
        </Link>
      </div>
    </article>
  );
};

export default ProductListCard;
