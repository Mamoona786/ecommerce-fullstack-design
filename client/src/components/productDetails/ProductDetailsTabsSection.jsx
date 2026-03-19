import React, { useState } from "react";
import { FiCheck } from "react-icons/fi";

import blazerImg from "../../assets/laptop.png";
import shirtImg from "../../assets/phone.png";
import jacketImg from "../../assets/headphones.png";
import blueShirtImg from "../../assets/camera.png";
import bagImg from "../../assets/watch.png";

const tabs = ["Description", "Reviews", "Shipping", "About seller"];

const youMayLikeItems = [
  {
    id: 1,
    image: blazerImg,
    title: "Men Blazers Sets Elegant Formal",
    price: "$7.00 - $99.50",
  },
  {
    id: 2,
    image: shirtImg,
    title: "Men Shirt Sleeve Polo Contrast",
    price: "$7.00 - $99.50",
  },
  {
    id: 3,
    image: jacketImg,
    title: "Apple Watch Series Space Gray",
    price: "$7.00 - $99.50",
  },
  {
    id: 4,
    image: blueShirtImg,
    title: "Basketball Crew Socks Long Stuff",
    price: "$7.00 - $99.50",
  },
  {
    id: 5,
    image: bagImg,
    title: "New Summer Men's castrol T-Shirts",
    price: "$7.00 - $99.50",
  },
];

const specRows = [
  { label: "Model", value: "#8786867" },
  { label: "Style", value: "Classic style" },
  { label: "Certificate", value: "ISO-898921212" },
  { label: "Size", value: "34mm x 450mm x 19mm" },
  { label: "Memory", value: "36GB RAM" },
];

const features = [
  "Some great feature name here",
  "Lorem ipsum dolor sit amet, consectetur",
  "Duis aute irure dolor in reprehenderit",
  "Some great feature name here",
];

function ProductDetailsTabsSection() {
  const [activeTab, setActiveTab] = useState("Description");

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
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  <br />
                  Quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo consequat. Duis aute irure dolor in reprehenderit
                  in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur.
                </p>

                <div className="product-details-spec-table">
                  {specRows.map((row) => (
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
                  {features.map((feature, index) => (
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
                Reviews content goes here
              </div>
            )}

            {activeTab === "Shipping" && (
              <div className="product-details-tab-placeholder">
                Shipping information goes here
              </div>
            )}

            {activeTab === "About seller" && (
              <div className="product-details-tab-placeholder">
                Seller information goes here
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
