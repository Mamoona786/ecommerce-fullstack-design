import React from "react";
import { IoChevronUpOutline } from "react-icons/io5";
import { FaStar, FaRegStar } from "react-icons/fa";

const categoryItems = [
  "Mobile accessory",
  "Electronics",
  "Smartphones",
  "Modern tech",
];

const brandItems = ["Samsung", "Apple", "Huawei", "Pocco", "Lenovo"];

const featureItems = [
  "Metallic",
  "Plastic cover",
  "8GB Ram",
  "Super power",
  "Large Memory",
];

const conditionItems = ["Any", "Refurbished", "Brand new", "Old items"];

const ratingRows = [5, 4, 3, 2];

const ProductsSidebar = () => {
  return (
    <aside className="products-sidebar">
      <div className="products-filter-block">
        <div className="products-filter-header">
          <h3>Category</h3>
          <IoChevronUpOutline />
        </div>

        <div className="products-filter-links">
          {categoryItems.map((item) => (
            <button key={item}>{item}</button>
          ))}
          <button className="products-see-all">See all</button>
        </div>
      </div>

      <div className="products-filter-block">
        <div className="products-filter-header">
          <h3>Brands</h3>
          <IoChevronUpOutline />
        </div>

        <div className="products-filter-options">
          {brandItems.map((item) => (
            <label key={item} className="products-checkbox-row">
              <input type="checkbox" />
              <span className="products-custom-checkbox" />
              <span>{item}</span>
            </label>
          ))}
        </div>

        <button className="products-see-all">See all</button>
      </div>

      <div className="products-filter-block">
        <div className="products-filter-header">
          <h3>Features</h3>
          <IoChevronUpOutline />
        </div>

        <div className="products-filter-options">
          {featureItems.map((item) => (
            <label key={item} className="products-checkbox-row">
              <input type="checkbox" />
              <span className="products-custom-checkbox" />
              <span>{item}</span>
            </label>
          ))}
        </div>

        <button className="products-see-all">See all</button>
      </div>

      <div className="products-filter-block">
        <div className="products-filter-header">
          <h3>Price range</h3>
          <IoChevronUpOutline />
        </div>

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
            <input type="text" placeholder="0" />
            <input type="text" placeholder="999999" />
          </div>

          <button className="products-apply-btn">Apply</button>
        </div>
      </div>

      <div className="products-filter-block">
        <div className="products-filter-header">
          <h3>Condition</h3>
          <IoChevronUpOutline />
        </div>

        <div className="products-filter-options">
          {conditionItems.map((item, index) => (
            <label key={item} className="products-radio-row">
              <input type="radio" name="condition" defaultChecked={index === 0} />
              <span className="products-custom-radio" />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="products-filter-block">
        <div className="products-filter-header">
          <h3>Ratings</h3>
          <IoChevronUpOutline />
        </div>

        <div className="products-filter-options products-ratings-options">
          {ratingRows.map((filledStars) => (
            <label key={filledStars} className="products-checkbox-row products-rating-row">
              <input type="checkbox" />
              <span className="products-custom-checkbox" />
              <span className="products-rating-stars">
                {Array.from({ length: 5 }).map((_, index) =>
                  index < filledStars ? (
                    <FaStar key={index} className="products-rating-star-filled" />
                  ) : (
                    <FaRegStar key={index} className="products-rating-star-empty" />
                  )
                )}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ProductsSidebar;
