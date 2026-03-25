import React from "react";
import { Link } from "react-router-dom";
import { IoChevronForwardOutline } from "react-icons/io5";

const defaultItems = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
];

const ProductsBreadcrumb = ({ items = defaultItems }) => {
  return (
    <div className="products-breadcrumb">
      {items.map((item, index) => (
        <React.Fragment key={`${item.label}-${index}`}>
          {item.to ? (
            <Link to={item.to} className="products-breadcrumb-item products-breadcrumb-link">
              {item.label}
            </Link>
          ) : (
            <span className="products-breadcrumb-item">{item.label}</span>
          )}

          {index !== items.length - 1 && (
            <IoChevronForwardOutline className="products-breadcrumb-separator" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProductsBreadcrumb;
