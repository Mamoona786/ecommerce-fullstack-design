import React from "react";

const RecommendedSection = ({ items }) => {
  return (
    <section className="recommended-section">
      <h2 className="recommended-heading">Recommended items</h2>

      <div className="recommended-grid">
        {items.map((item, index) => (
          <article key={`${item.title}-${index}`} className="recommended-card">
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
          </article>
        ))}
      </div>
    </section>
  );
};

export default RecommendedSection;
