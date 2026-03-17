import React from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoChevronDownOutline } from "react-icons/io5";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <div className="nav-left">
          <span className="nav-link nav-link-active nav-with-icon">
            <HiOutlineMenuAlt3 className="nav-inline-icon" />
            All category
          </span>
          <span className="nav-link">Hot offers</span>
          <span className="nav-link">Gift boxes</span>
          <span className="nav-link">Projects</span>
          <span className="nav-link">Menu item</span>
          <span className="nav-link nav-with-icon">
            Help
            <IoChevronDownOutline className="nav-chevron" />
          </span>
        </div>

        <div className="nav-right">
          <span className="nav-link nav-with-icon">
            English, USD
            <IoChevronDownOutline className="nav-chevron" />
          </span>
          <span className="nav-link nav-with-icon">
            Ship to 🇩🇪
            <IoChevronDownOutline className="nav-chevron" />
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
