import React from "react";
import { IoChevronForwardOutline } from "react-icons/io5";

const ProductsBreadcrumb = () => {
  const items = ["Home", "Clothings", "Men’s wear", "Summer clothing"];

  return (
    <div className="products-breadcrumb">
      {items.map((item, index) => (
        <React.Fragment key={item}>
          <span className="products-breadcrumb-item">{item}</span>
          {index !== items.length - 1 && (
            <IoChevronForwardOutline className="products-breadcrumb-separator" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProductsBreadcrumb;
