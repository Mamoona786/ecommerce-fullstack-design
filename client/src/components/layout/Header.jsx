import React from "react";
import {
  FaUser,
  FaRegCommentDots,
  FaRegHeart,
  FaShoppingCart,
  FaSearch,
} from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoChevronDownOutline } from "react-icons/io5";

const Header = () => {
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="logo-wrapper">
          <div className="logo-icon">
            <HiOutlineShoppingBag />
          </div>
          <div className="logo-text">Brand</div>
        </div>

        <div className="search-wrapper">
          <input type="text" placeholder="Search" className="search-input" />

          <div className="search-select-wrapper">
            <select className="search-select">
              <option>All category</option>
            </select>
            <IoChevronDownOutline className="select-chevron" />
          </div>

          <button className="search-button">
            <FaSearch className="search-btn-icon" />
            Search
          </button>
        </div>

        <div className="top-icons">
          <div className="icon-item">
            <FaUser className="icon" />
            <span className="icon-label">Profile</span>
          </div>

          <div className="icon-item">
            <FaRegCommentDots className="icon" />
            <span className="icon-label">Message</span>
          </div>

          <div className="icon-item">
            <FaRegHeart className="icon" />
            <span className="icon-label">Orders</span>
          </div>

          <div className="icon-item">
            <FaShoppingCart className="icon" />
            <span className="icon-label">My cart</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
