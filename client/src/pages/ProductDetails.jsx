import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import ProductsBreadcrumb from "../components/products/ProductsBreadcrumb";
import FooterSection from "../components/common/FooterSection";
import ProductDiscountBanner from "../components/common/ProductDiscountBanner";
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

import { getProductById } from "../services/productService";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(id);
        setProduct(data);
        setSelectedImage(data?.image || "");
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return product.relatedIds || [];
  }, [product]);

  const youMayLikeItems = useMemo(() => {
    if (!product) return [];
    return product.youMayLikeIds || [];
  }, [product]);

  if (loading) {
    return (
      <>
        <Header />
        <Navbar />
        <main className="product-details-page">
          <div className="container">
            <div style={{ padding: "40px 0" }}>Loading product...</div>
          </div>
        </main>
        <FooterSection />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <Navbar />
        <main className="product-details-page">
          <div className="container">
            <div style={{ padding: "40px 0" }}>
              <h2>{error || "Product not found."}</h2>
              <button type="button" onClick={() => navigate("/products")}>
                Back to products
              </button>
            </div>
          </div>
        </main>
        <FooterSection />
      </>
    );
  }

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
                  src={selectedImage || product.image}
                  alt={product.title}
                  className="product-main-image"
                />
              </div>

              <div className="product-thumbnails-row">
                {(product.thumbnails || []).map((thumb, index) => (
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
                <span>{product.stockStatus}</span>
              </div>

              <h1 className="product-details-title">{product.title}</h1>

              <div className="product-rating-row">
                <div className="product-rating-stars">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaRegStar />
                </div>

                <span className="product-rating-score">{product.rating}</span>

                <span className="product-rating-meta">
                  <FaRegCommentDots />
                  {product.reviews} reviews
                </span>

                <span className="product-rating-meta">
                  <FiShoppingBag />
                  {product.sold} sold
                </span>
              </div>

              <div className="product-tier-pricing">
                {(product.priceTiers || []).map((tier, index) => (
                  <div
                    key={`${tier.price}-${tier.qty}`}
                    className={`product-tier-price-item ${
                      index === 0 ? "product-tier-price-item-active" : ""
                    }`}
                  >
                    <h3>{tier.price}</h3>
                    <p>{tier.qty}</p>
                  </div>
                ))}
              </div>

              <div className="product-specs-table">
                {(product.specificationRows || []).map((row, index) => (
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
                  <div className="supplier-logo-box">
                    {product.seller?.logoLetter || "R"}
                  </div>

                  <div className="supplier-top-text">
                    <span className="supplier-label">Supplier</span>
                    <h3>{product.seller?.name}</h3>
                  </div>
                </div>

                <div className="supplier-divider" />

                <div className="supplier-info-list">
                  <div className="supplier-info-item">
                    <span className="supplier-info-flag">🇩🇪</span>
                    <span>{product.seller?.location}</span>
                  </div>

                  <div className="supplier-info-item">
                    <FiShield />
                    <span>
                      {product.seller?.verified ? "Verified Seller" : "Seller"}
                    </span>
                  </div>

                  <div className="supplier-info-item">
                    <FiGlobe />
                    <span>{product.seller?.shipping}</span>
                  </div>
                </div>

                <button className="supplier-primary-btn" type="button">
                  Send inquiry
                </button>

                <button
                  className="supplier-secondary-btn"
                  type="button"
                  onClick={() =>
                    navigate(
                      `/products?seller=${encodeURIComponent(
                        product.seller?.name || ""
                      )}`
                    )
                  }
                >
                  Seller&apos;s profile
                </button>
              </div>

              <button
                className="save-later-btn"
                type="button"
                onClick={() => setIsSaved((prev) => !prev)}
              >
                <FiHeart />
                <span>{isSaved ? "Saved" : "Save for later"}</span>
              </button>
            </aside>
          </section>

          <ProductDetailsTabsSection
            product={product}
            youMayLikeItems={youMayLikeItems}
          />

          <RelatedProductsSection items={relatedProducts} />
          <ProductDiscountBanner />
        </div>
      </main>

      <FooterSection />
    </>
  );
}

export default ProductDetails;
