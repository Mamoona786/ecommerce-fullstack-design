import React from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi";

const ProductsToolbar = () => {
  return (
    <div className="products-toolbar">
      <div className="products-toolbar-left">
        <p className="products-toolbar-result">
          12,911 items in <strong>Mobile accessory</strong>
        </p>
      </div>

      <div className="products-toolbar-right">
        <label className="products-verified">
          <input type="checkbox" defaultChecked />
          <span>Verified only</span>
        </label>

        <button className="products-featured-btn">
          Featured
          <IoChevronDownOutline />
        </button>

        <div className="products-view-toggle">
          <button className="products-view-btn">
            <HiOutlineViewGrid />
          </button>
          <button className="products-view-btn products-view-btn-active">
            <HiOutlineViewList />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsToolbar;
