import React, { useState } from "react";
import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import ProductsBreadcrumb from "../components/products/ProductsBreadcrumb";
import FooterSection from "../components/common/FooterSection";
import ProductDetailsTabsSection from "../components/productDetails/ProductDetailsTabsSection";
import RelatedProductsSection from "../components/productDetails/RelatedProductsSection";
import "../styles/productDetails.css";

import {
  FaStar,
  FaRegStar,
  FaRegCommentDots,
  FaCheck,
} from "react-icons/fa";
import {
  FiShoppingBag,
  FiShield,
  FiGlobe,
  FiHeart,
} from "react-icons/fi";

import mainProductImg from "../assets/watch.png";
import thumb1 from "../assets/shirt-1.png";
import thumb2 from "../assets/shirt-2.png";
import thumb3 from "../assets/shirt-3.png";
import thumb4 from "../assets/shirt-4.png";
import thumb5 from "../assets/shirt-5.png";
import thumb6 from "../assets/shirt-6.png";

function ProductDetails() {
  const thumbnails = [thumb1, thumb2, thumb3, thumb4, thumb5, thumb6];
  const [selectedImage, setSelectedImage] = useState(mainProductImg);

  const specificationRows = [
    { label: "Price:", value: "Negotiable" },
    { label: "Type:", value: "Classic shoes" },
    { label: "Material:", value: "Plastic material" },
    { label: "Design:", value: "Modern nice" },
    {
      label: "Customization:",
      value: "Customized logo and design custom packages",
    },
    { label: "Protection:", value: "Refund Policy" },
    { label: "Warranty:", value: "2 years full warranty" },
  ];

  return (
    <>
      <Header />
      <Navbar />

      <main className="product-details-page">
        <div className="container">
          <ProductsBreadcrumb />

          <section className="product-details-card">
            <div className="product-details-left">
              <div className="product-main-image-box">
                <img
                  src={selectedImage}
                  alt="Product"
                  className="product-main-image"
                />
              </div>

              <div className="product-thumbnails-row">
                {thumbnails.map((thumb, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`product-thumb-btn ${
                      selectedImage === thumb ? "product-thumb-btn-active" : ""
                    }`}
                    onClick={() => setSelectedImage(thumb)}
                  >
                    <img
                      src={thumb}
                      alt={`Product thumbnail ${index + 1}`}
                      className="product-thumb-image"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="product-details-center">
              <div className="product-stock-status">
                <FaCheck />
                <span>In stock</span>
              </div>

              <h1 className="product-details-title">
                Mens Long Sleeve T-shirt Cotton Base
                <br />
                Layer Slim Muscle
              </h1>

              <div className="product-rating-row">
                <div className="product-rating-stars">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaRegStar />
                </div>

                <span className="product-rating-score">9.3</span>

                <span className="product-rating-meta">
                  <FaRegCommentDots />
                  32 reviews
                </span>

                <span className="product-rating-meta">
                  <FiShoppingBag />
                  154 sold
                </span>
              </div>

              <div className="product-tier-pricing">
                <div className="product-tier-price-item product-tier-price-item-active">
                  <h3>$98.00</h3>
                  <p>50-100 pcs</p>
                </div>

                <div className="product-tier-price-item">
                  <h3>$90.00</h3>
                  <p>100-700 pcs</p>
                </div>

                <div className="product-tier-price-item">
                  <h3>$78.00</h3>
                  <p>700+ pcs</p>
                </div>
              </div>

              <div className="product-specs-table">
                {specificationRows.map((row, index) => (
                  <div className="product-specs-row" key={index}>
                    <div className="product-specs-label">{row.label}</div>
                    <div className="product-specs-value">{row.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="product-details-right">
              <div className="supplier-card">
                <div className="supplier-top">
                  <div className="supplier-logo-box">R</div>

                  <div className="supplier-top-text">
                    <span className="supplier-label">Supplier</span>
                    <h3>Guanjoi Trading LLC</h3>
                  </div>
                </div>

                <div className="supplier-divider" />

                <div className="supplier-info-list">
                  <div className="supplier-info-item">
                    <span className="supplier-info-flag">🇩🇪</span>
                    <span>Germany, Berlin</span>
                  </div>

                  <div className="supplier-info-item">
                    <FiShield />
                    <span>Verified Seller</span>
                  </div>

                  <div className="supplier-info-item">
                    <FiGlobe />
                    <span>Worldwide shipping</span>
                  </div>
                </div>

                <button className="supplier-primary-btn" type="button">
                  Send inquiry
                </button>
                <button className="supplier-secondary-btn" type="button">
                  Seller&apos;s profile
                </button>
              </div>

              <button className="save-later-btn" type="button">
                <FiHeart />
                <span>Save for later</span>
              </button>
            </aside>
          </section>

          <ProductDetailsTabsSection />
          <RelatedProductsSection />
        </div>
      </main>

      <FooterSection />
    </>
  );
}

export default ProductDetails;
