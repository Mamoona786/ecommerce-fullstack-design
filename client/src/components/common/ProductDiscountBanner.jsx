import React from "react";

function ProductDiscountBanner() {
  return (
    <div className="product-discount-banner">
      <div className="product-discount-banner-left">
        <h3 className="product-discount-banner-title">
          Super discount on more than 100 USD
        </h3>
        <p className="product-discount-banner-text">
          Have you ever finally just write dummy info
        </p>
      </div>

      <div className="product-discount-banner-right">
        <button type="button" className="product-discount-banner-btn">
          Shop now
        </button>
      </div>
    </div>
  );
}

export default ProductDiscountBanner;
