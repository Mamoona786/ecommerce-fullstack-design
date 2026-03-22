import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCheck } from "react-icons/fi";

const tabs = ["Description", "Reviews", "Shipping", "About seller"];

function ProductDetailsTabsSection({ product, youMayLikeItems = [] }) {
  const [activeTab, setActiveTab] = useState("Description");
  const navigate = useNavigate();

  return (
    <section className="product-details-lower-section">
      <div className="product-details-lower-main">
        <div className="product-details-tabs-card">
          <div className="product-details-tabs-nav">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`product-details-tab-btn ${
                  activeTab === tab ? "product-details-tab-btn-active" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="product-details-tab-content">
            {activeTab === "Description" && (
              <>
                <p className="product-details-description-text">
                  {product?.shortDescription}
                </p>

                <div className="product-details-spec-table">
                  {(product?.detailSpecRows || []).map((row) => (
                    <div className="product-details-spec-table-row" key={row.label}>
                      <div className="product-details-spec-table-label">
                        {row.label}
                      </div>
                      <div className="product-details-spec-table-value">
                        {row.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="product-details-feature-list">
                  {(product?.features || []).map((feature, index) => (
                    <div className="product-details-feature-item" key={index}>
                      <span className="product-details-feature-icon">
                        <FiCheck />
                      </span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === "Reviews" && (
              <div className="product-details-tab-placeholder">
                {product?.reviews || 0} reviews available for this product.
              </div>
            )}

            {activeTab === "Shipping" && (
              <div className="product-details-tab-placeholder">
                {product?.shipping || "Worldwide shipping"}.
              </div>
            )}

            {activeTab === "About seller" && (
              <div className="product-details-tab-placeholder">
                Seller: {product?.seller?.name} — {product?.seller?.location}
              </div>
            )}
          </div>
        </div>
      </div>

      <aside className="product-details-you-may-like">
        <div className="product-details-you-may-like-card">
          <h3 className="product-details-you-may-like-title">You may like</h3>

          <div className="product-details-you-may-like-list">
            {youMayLikeItems.map((item) => (
              <article
                className="product-details-you-may-like-item"
                key={item.id}
                onClick={() => navigate(`/products/${item.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="product-details-you-may-like-image-wrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="product-details-you-may-like-image"
                  />
                </div>

                <div className="product-details-you-may-like-content">
                  <h4 className="product-details-you-may-like-item-title">
                    {item.title}
                  </h4>
                  <p className="product-details-you-may-like-price">
                    {item.price}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
}

export default ProductDetailsTabsSection;
