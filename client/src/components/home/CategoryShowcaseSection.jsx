import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryShowcaseSection = ({
  title,
  buttonText,
  bannerImage,
  items,
  sectionClass = "",
  sectionLink = "/products",
}) => {
  const navigate = useNavigate();

  return (
    <section className={`category-showcase ${sectionClass}`}>
      <div
        className="category-showcase-banner"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="category-showcase-banner-content">
          <h2 className="category-showcase-title">{title}</h2>
          <button
            className="category-showcase-button"
            type="button"
            onClick={() => navigate(sectionLink)}
          >
            {buttonText}
          </button>
        </div>
      </div>

      <div className="category-showcase-grid">
        {items.map((item, index) => (
          <button
            key={`${item.name}-${index}`}
            type="button"
            className="showcase-card showcase-card-button"
            onClick={() => navigate(`/products/${item.id}`)}
          >
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
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryShowcaseSection;
