import React, { useEffect, useRef, useState } from "react";
import {
  IoChevronBackOutline,
  IoChevronDownOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";
import { PAGE_SIZE_OPTIONS } from "../../constants/productFilters";

const ProductsPagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const [pageSizeOpen, setPageSizeOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setPageSizeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const visiblePages =
    totalPages <= 3
      ? pages
      : currentPage <= 2
      ? [1, 2, 3]
      : currentPage >= totalPages - 1
      ? [totalPages - 2, totalPages - 1, totalPages]
      : [currentPage - 1, currentPage, currentPage + 1];

  return (
    <div className="products-pagination-wrap">
      <div className="products-dropdown-wrap" ref={dropdownRef}>
        <button
          type="button"
          className="products-pagination-select"
          onClick={() => setPageSizeOpen((prev) => !prev)}
        >
          Show {itemsPerPage}
          <IoChevronDownOutline />
        </button>

        {pageSizeOpen && (
          <div className="products-dropdown-menu products-dropdown-menu-up">
            {PAGE_SIZE_OPTIONS.map((size) => (
              <button
                key={size}
                type="button"
                className={itemsPerPage === size ? "active" : ""}
                onClick={() => {
                  onItemsPerPageChange(size);
                  setPageSizeOpen(false);
                }}
              >
                Show {size}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="products-pagination">
        <button
          type="button"
          className="products-page-nav"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <IoChevronBackOutline />
        </button>

        {visiblePages.map((page) => (
          <button
            key={page}
            type="button"
            className={`products-page-btn ${
              currentPage === page ? "products-page-btn-active" : ""
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          className="products-page-nav"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <IoChevronForwardOutline />
        </button>
      </div>
    </div>
  );
};

export default ProductsPagination;
