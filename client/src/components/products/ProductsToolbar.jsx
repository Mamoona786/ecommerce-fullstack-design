import React, { useEffect, useRef, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi";
import { SORT_OPTIONS } from "../../constants/productFilters";

const ProductsToolbar = ({
  totalItems,
  activeCategoryLabel,
  verifiedOnly,
  onVerifiedChange,
  sortOption,
  onSortChange,
  viewMode,
  onViewChange,
}) => {
  const [sortOpen, setSortOpen] = useState(false);
  const dropdownRef = useRef(null);

  const activeSortLabel =
    SORT_OPTIONS.find((item) => item.value === sortOption)?.label || "Featured";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="products-toolbar">
      <div className="products-toolbar-left">
        <p className="products-toolbar-result">
          {totalItems.toLocaleString()} items in{" "}
          <strong>{activeCategoryLabel || "All products"}</strong>
        </p>
      </div>

      <div className="products-toolbar-right">
        <label className="products-verified">
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={(e) => onVerifiedChange(e.target.checked)}
          />
          <span>Verified only</span>
        </label>

        <div className="products-dropdown-wrap" ref={dropdownRef}>
          <button
            type="button"
            className="products-featured-btn"
            onClick={() => setSortOpen((prev) => !prev)}
          >
            {activeSortLabel}
            <IoChevronDownOutline />
          </button>

          {sortOpen && (
            <div className="products-dropdown-menu">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={sortOption === option.value ? "active" : ""}
                  onClick={() => {
                    onSortChange(option.value);
                    setSortOpen(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="products-view-toggle">
          <button
            type="button"
            className={`products-view-btn ${
              viewMode === "grid" ? "products-view-btn-active" : ""
            }`}
            onClick={() => onViewChange("grid")}
          >
            <HiOutlineViewGrid />
          </button>

          <button
            type="button"
            className={`products-view-btn ${
              viewMode === "list" ? "products-view-btn-active" : ""
            }`}
            onClick={() => onViewChange("list")}
          >
            <HiOutlineViewList />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsToolbar;
