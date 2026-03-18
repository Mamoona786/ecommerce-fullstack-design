import React from "react";
import { IoChevronBackOutline, IoChevronDownOutline, IoChevronForwardOutline } from "react-icons/io5";

const ProductsPagination = () => {
  return (
    <div className="products-pagination-wrap">
      <button className="products-pagination-select">
        Show 10
        <IoChevronDownOutline />
      </button>

      <div className="products-pagination">
        <button className="products-page-nav">
          <IoChevronBackOutline />
        </button>

        <button className="products-page-btn products-page-btn-muted">1</button>
        <button className="products-page-btn products-page-btn-active">2</button>
        <button className="products-page-btn">3</button>

        <button className="products-page-nav">
          <IoChevronForwardOutline />
        </button>
      </div>
    </div>
  );
};

export default ProductsPagination;
