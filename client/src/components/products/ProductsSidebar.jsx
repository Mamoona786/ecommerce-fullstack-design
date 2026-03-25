import React, { useState } from "react";
import { IoChevronUpOutline } from "react-icons/io5";
import { FaStar, FaRegStar } from "react-icons/fa";
import {
  CATEGORY_ITEMS,
  BRAND_ITEMS,
  FEATURE_ITEMS,
  CONDITION_ITEMS,
  RATING_ROWS,
} from "../../constants/productFilters";

const ProductsSidebar = ({
  selectedCategory,
  onCategoryChange,
  selectedBrands,
  onBrandChange,
  selectedFeatures,
  onFeatureChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  onApplyPrice,
  selectedCondition,
  onConditionChange,
  selectedRatings,
  onRatingChange,
}) => {
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [brandsOpen, setBrandsOpen] = useState(true);
  const [featuresOpen, setFeaturesOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [conditionOpen, setConditionOpen] = useState(true);
  const [ratingsOpen, setRatingsOpen] = useState(true);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const visibleCategories = showAllCategories
    ? CATEGORY_ITEMS
    : CATEGORY_ITEMS.slice(0, 4);

  return (
    <aside className="products-sidebar">
      <div className="products-filter-block">
        <div
          className="products-filter-header"
          onClick={() => setCategoryOpen((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          <h3>Category</h3>
          <IoChevronUpOutline
            className={categoryOpen ? "" : "products-chevron-rotated"}
          />
        </div>

        {categoryOpen && (
          <div className="products-filter-links">
            {visibleCategories.map((item) => (
              <button
                key={item}
                type="button"
                className={
                  selectedCategory === item ? "products-filter-link-active" : ""
                }
                onClick={() => onCategoryChange(item)}
              >
                {item}
              </button>
            ))}

            <button
              type="button"
              className="products-see-all"
              onClick={() => setShowAllCategories((prev) => !prev)}
            >
              {showAllCategories ? "Show less" : "See all"}
            </button>
          </div>
        )}
      </div>

      <div className="products-filter-block">
        <div
          className="products-filter-header"
          onClick={() => setBrandsOpen((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          <h3>Brands</h3>
          <IoChevronUpOutline
            className={brandsOpen ? "" : "products-chevron-rotated"}
          />
        </div>

        {brandsOpen && (
          <>
            <div className="products-filter-options">
              {BRAND_ITEMS.map((item) => (
                <label key={item} className="products-checkbox-row">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(item)}
                    onChange={() => onBrandChange(item)}
                  />
                  <span className="products-custom-checkbox" />
                  <span>{item}</span>
                </label>
              ))}
            </div>

            <button type="button" className="products-see-all">
              See all
            </button>
          </>
        )}
      </div>

      <div className="products-filter-block">
        <div
          className="products-filter-header"
          onClick={() => setFeaturesOpen((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          <h3>Features</h3>
          <IoChevronUpOutline
            className={featuresOpen ? "" : "products-chevron-rotated"}
          />
        </div>

        {featuresOpen && (
          <>
            <div className="products-filter-options">
              {FEATURE_ITEMS.map((item) => (
                <label key={item} className="products-checkbox-row">
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes(item)}
                    onChange={() => onFeatureChange(item)}
                  />
                  <span className="products-custom-checkbox" />
                  <span>{item}</span>
                </label>
              ))}
            </div>

            <button type="button" className="products-see-all">
              See all
            </button>
          </>
        )}
      </div>

      <div className="products-filter-block">
        <div
          className="products-filter-header"
          onClick={() => setPriceOpen((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          <h3>Price range</h3>
          <IoChevronUpOutline
            className={priceOpen ? "" : "products-chevron-rotated"}
          />
        </div>

        {priceOpen && (
          <div className="products-price-range">
            <div className="products-range-line">
              <div className="products-range-line-fill" />
              <span className="products-range-thumb products-range-thumb-left" />
              <span className="products-range-thumb products-range-thumb-right" />
            </div>

            <div className="products-price-input-labels">
              <span>Min</span>
              <span>Max</span>
            </div>

            <div className="products-price-inputs">
              <input
                type="number"
                placeholder="0"
                value={minPrice}
                onChange={(e) => onMinPriceChange(e.target.value)}
              />
              <input
                type="number"
                placeholder="999999"
                value={maxPrice}
                onChange={(e) => onMaxPriceChange(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="products-apply-btn"
              onClick={onApplyPrice}
            >
              Apply
            </button>
          </div>
        )}
      </div>

      <div className="products-filter-block">
        <div
          className="products-filter-header"
          onClick={() => setConditionOpen((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          <h3>Condition</h3>
          <IoChevronUpOutline
            className={conditionOpen ? "" : "products-chevron-rotated"}
          />
        </div>

        {conditionOpen && (
          <div className="products-filter-options">
            {CONDITION_ITEMS.map((item) => (
              <label key={item} className="products-radio-row">
                <input
                  type="radio"
                  name="condition"
                  checked={selectedCondition === item}
                  onChange={() => onConditionChange(item)}
                />
                <span className="products-custom-radio" />
                <span>{item}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="products-filter-block">
        <div
          className="products-filter-header"
          onClick={() => setRatingsOpen((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          <h3>Ratings</h3>
          <IoChevronUpOutline
            className={ratingsOpen ? "" : "products-chevron-rotated"}
          />
        </div>

        {ratingsOpen && (
          <div className="products-filter-options products-ratings-options">
            {RATING_ROWS.map((filledStars) => (
              <label
                key={filledStars}
                className="products-checkbox-row products-rating-row"
              >
                <input
                  type="checkbox"
                  checked={selectedRatings.includes(filledStars)}
                  onChange={() => onRatingChange(filledStars)}
                />
                <span className="products-custom-checkbox" />
                <span className="products-rating-stars">
                  {Array.from({ length: 5 }).map((_, index) =>
                    index < filledStars ? (
                      <FaStar
                        key={index}
                        className="products-rating-star-filled"
                      />
                    ) : (
                      <FaRegStar
                        key={index}
                        className="products-rating-star-empty"
                      />
                    )
                  )}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default ProductsSidebar;
