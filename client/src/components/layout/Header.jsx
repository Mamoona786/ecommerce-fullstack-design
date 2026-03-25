import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaRegCommentDots,
  FaShoppingCart,
  FaSearch,
  FaBoxOpen,
  FaSignOutAlt,
} from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoChevronDownOutline } from "react-icons/io5";

const Header = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("All category");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (searchText.trim()) params.set("search", searchText.trim());
    if (category !== "All category") params.set("category", category);

    navigate(`/products${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo-wrapper">
          <div className="logo-icon">
            <HiOutlineShoppingBag />
          </div>
          <div className="logo-text">Brand</div>
        </Link>

        <form className="search-wrapper" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <div className="search-select-wrapper">
            <select
              className="search-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>All category</option>
              <option>Electronics</option>
              <option>Home</option>
              <option>Fashion</option>
              <option>Computers</option>
              <option>Wearables</option>
            </select>
            <IoChevronDownOutline className="select-chevron" />
          </div>

          <button className="search-button" type="submit">
            <FaSearch className="search-btn-icon" />
            Search
          </button>
        </form>

        <div className="top-icons">
          {user ? (
            <>
              <button
                className="icon-item icon-item-button"
                type="button"
                onClick={() => navigate("/profile")}
              >
                <FaUser className="icon" />
                <span className="icon-label">
                  {user.username || "Profile"}
                </span>
              </button>

              <button
                className="icon-item icon-item-button"
                type="button"
                onClick={() => navigate("/orders")}
              >
                <FaBoxOpen className="icon" />
                <span className="icon-label">Orders</span>
              </button>

              <button
                className="icon-item icon-item-button"
                type="button"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="icon" />
                <span className="icon-label">Logout</span>
              </button>
            </>
          ) : (
            <Link to="/login" className="icon-item">
              <FaUser className="icon" />
              <span className="icon-label">Login</span>
            </Link>
          )}

          <button className="icon-item icon-item-button" type="button">
            <FaRegCommentDots className="icon" />
            <span className="icon-label">Message</span>
          </button>

          <Link to="/cart" className="icon-item">
            <FaShoppingCart className="icon" />
            <span className="icon-label">My cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
