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
import { addCartItem } from "../utils/cartHelpers";
import { addToCart } from "../services/cartService";

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
import {
  getUniqueProductImages,
  isProductSaved,
  toggleSavedProduct,
} from "../utils/productDetailsHelpers";

const formatCurrency = (value) => `$${Number(value || 0).toFixed(2)}`;

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedTierIndex, setSelectedTierIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
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

        const allImages = getUniqueProductImages(data);
        setSelectedImage(allImages[0] || "");
        setSelectedTierIndex(0);
        setQuantity(1);
        setIsSaved(isProductSaved(data?._id || data?.id));
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

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  const productImages = useMemo(() => {
    return getUniqueProductImages(product);
  }, [product]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return Array.isArray(product.relatedIds) ? product.relatedIds : [];
  }, [product]);

  const youMayLikeItems = useMemo(() => {
    if (!product) return [];
    return Array.isArray(product.youMayLikeIds) ? product.youMayLikeIds : [];
  }, [product]);

  const selectedTierPrice = useMemo(() => {
    if (!product?.priceTiers?.length) return Number(product?.price || 0);
    return Number(product.priceTiers[selectedTierIndex]?.price || product.price || 0);
  }, [product, selectedTierIndex]);

  const breadcrumbItems = useMemo(() => {
    if (!product) {
      return [
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
      ];
    }

    return [
      { label: "Home", to: "/" },
      { label: "Products", to: "/products" },
      {
        label: product.category || "Category",
        to: `/products?category=${encodeURIComponent(product.category || "")}`,
      },
      { label: product.name },
    ];
  }, [product]);

  const maxQty = useMemo(() => {
    const stock = Number(product?.stock || 0);
    if (stock <= 0) return 1;
    return Math.min(stock, 10);
  }, [product]);

  const handleSaveToggle = () => {
    if (!product) return;
    const savedStatus = toggleSavedProduct(product);
    setIsSaved(savedStatus);
  };

  const handleAddToCart = async () => {
  if (!product) return;

  if (Number(product.stock || 0) <= 0) {
    alert("This product is out of stock.");
    return;
  }

  if (quantity > Number(product.stock || 0)) {
    alert(`Only ${product.stock} item(s) available in stock.`);
    return;
  }

  try {
    if (isAuthenticated) {
      await addToCart({
        productId: product._id,
        quantity,
        selectedTierPrice,
      });
    } else {
      addCartItem({
        product,
        quantity,
        selectedTierPrice,
      });
    }

    alert("Product added to cart successfully!");
  } catch (error) {
    console.error("Failed to add product to cart:", error);
    alert(error?.response?.data?.message || "Failed to add product to cart");
  }
};

  const handleBuyNow = async () => {
  if (!product) return;

  if (Number(product.stock || 0) <= 0) {
    alert("This product is out of stock.");
    return;
  }

  if (quantity > Number(product.stock || 0)) {
    alert(`Only ${product.stock} item(s) available in stock.`);
    return;
  }

  try {
    if (isAuthenticated) {
      await addToCart({
        productId: product._id,
        quantity,
        selectedTierPrice,
      });
    } else {
      addCartItem({
        product,
        quantity,
        selectedTierPrice,
      });
    }

    navigate("/cart");
  } catch (error) {
    console.error("Failed to buy product now:", error);
    alert(error?.response?.data?.message || "Failed to add product to cart");
  }
};

  const handleSendInquiry = () => {
    if (!product?.seller?.name) return;
    navigate(`/products?seller=${encodeURIComponent(product.seller.name)}`);
  };

  const handleSellerProfile = () => {
    if (!product?.seller?.name) return;
    navigate(`/products?seller=${encodeURIComponent(product.seller.name)}`);
  };

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
          <ProductsBreadcrumb items={breadcrumbItems} />

          <section className="product-details-card">
            <div className="product-details-left">
              <div className="product-main-image-box">
                <img
                  src={selectedImage || product.image}
                  alt={product.name}
                  className="product-main-image"
                />
              </div>

              <div className="product-thumbnails-row">
                {productImages.map((thumb, index) => (
                  <button
                    key={`${thumb}-${index}`}
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
                <span>
                  {product.stockStatus}
                  {typeof product.stock === "number" ? ` (${product.stock} left)` : ""}
                </span>
              </div>

              <h1 className="product-details-title">{product.name}</h1>

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
                  <button
                    type="button"
                    key={`${tier.price}-${tier.qty}`}
                    className={`product-tier-price-item ${
                      selectedTierIndex === index
                        ? "product-tier-price-item-selected"
                        : index === 0
                        ? "product-tier-price-item-active"
                        : ""
                    }`}
                    onClick={() => setSelectedTierIndex(index)}
                  >
                    <h3>{formatCurrency(tier.price)}</h3>
                    <p>{tier.qty}</p>
                  </button>
                ))}
              </div>

              {!product.priceTiers?.length && (
                <div className="product-tier-pricing">
                  <button
                    type="button"
                    className="product-tier-price-item product-tier-price-item-selected"
                  >
                    <h3>{formatCurrency(product.price)}</h3>
                    <p>Single item price</p>
                  </button>
                </div>
              )}

              <div className="product-action-row">
                <div className="product-qty-select-wrap">
                  <label htmlFor="product-qty" className="product-qty-label">
                    Qty
                  </label>
                  <select
                    id="product-qty"
                    className="product-qty-select"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    disabled={Number(product.stock || 0) <= 0}
                  >
                    {Array.from({ length: maxQty }, (_, i) => i + 1).map((qty) => (
                      <option key={qty} value={qty}>
                        {qty}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  className="product-add-cart-btn"
                  onClick={handleAddToCart}
                  disabled={Number(product.stock || 0) <= 0}
                >
                  Add to cart
                </button>

                <button
                  type="button"
                  className="product-buy-now-btn"
                  onClick={handleBuyNow}
                  disabled={Number(product.stock || 0) <= 0}
                >
                  Buy now
                </button>
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

                <button
                  className="supplier-primary-btn"
                  type="button"
                  onClick={handleSendInquiry}
                >
                  Send inquiry
                </button>

                <button
                  className="supplier-secondary-btn"
                  type="button"
                  onClick={handleSellerProfile}
                >
                  Seller&apos;s profile
                </button>
              </div>

              <button
                className={`save-later-btn ${
                  isSaved ? "save-later-btn-active" : ""
                }`}
                type="button"
                onClick={handleSaveToggle}
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
