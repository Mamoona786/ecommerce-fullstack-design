import React from "react";

const CategoryShowcaseSection = ({
  title,
  buttonText,
  bannerImage,
  items,
  sectionClass = "",
}) => {
  return (
    <section className={`category-showcase ${sectionClass}`}>
      <div
        className="category-showcase-banner"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="category-showcase-banner-content">
          <h2 className="category-showcase-title">{title}</h2>
          <button className="category-showcase-button">{buttonText}</button>
        </div>
      </div>

      <div className="category-showcase-grid">
        {items.map((item, index) => (
          <div key={`${item.name}-${index}`} className="showcase-card">
            <div className="showcase-card-content">
              <h3 className="showcase-card-title">{item.name}</h3>
              <p className="showcase-card-price">
                <span>From</span>
                <br />
                {item.price}
              </p>
            </div>

            <div className="showcase-card-image-wrap">
              <img
                src={item.image}
                alt={item.name}
                className="showcase-card-image"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryShowcaseSection;
