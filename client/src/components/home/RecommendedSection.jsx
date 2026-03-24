import React from "react";
import { useNavigate } from "react-router-dom";

const RecommendedSection = ({ items }) => {
  const navigate = useNavigate();

  return (
    <section className="recommended-section">
      <h2 className="recommended-heading">Recommended items</h2>

      <div className="recommended-grid">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className="recommended-card recommended-card-button"
            onClick={() => navigate(`/products/${item.id}`)}
          >
            <div className="recommended-image-wrap">
              <img
                src={item.image}
                alt={item.title}
                className="recommended-image"
              />
            </div>

            <div className="recommended-card-content">
              <p className="recommended-price">{item.price}</p>
              <p className="recommended-title">{item.title}</p>
              <p className="recommended-subtitle">{item.subtitle}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default RecommendedSection;
