import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoChevronDownOutline } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate();
  const [helpOpen, setHelpOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [shipOpen, setShipOpen] = useState(false);

  const goToProducts = (query = "") => {
    navigate(`/products${query}`);
    setHelpOpen(false);
    setCurrencyOpen(false);
    setShipOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <div className="nav-left">
          <button
            type="button"
            className="nav-link nav-link-active nav-with-icon nav-button-reset"
            onClick={() => goToProducts()}
          >
            <HiOutlineMenuAlt3 className="nav-inline-icon" />
            All category
          </button>

          <button
            type="button"
            className="nav-link nav-button-reset"
            onClick={() => goToProducts("?filter=hot-offers")}
          >
            Hot offers
          </button>

          <button
            type="button"
            className="nav-link nav-button-reset"
            onClick={() => goToProducts("?filter=gift-boxes")}
          >
            Gift boxes
          </button>

          <button
            type="button"
            className="nav-link nav-button-reset"
            onClick={() => goToProducts("?filter=projects")}
          >
            Projects
          </button>

          <button
            type="button"
            className="nav-link nav-button-reset"
            onClick={() => goToProducts("?filter=menu-item")}
          >
            Menu item
          </button>

          <div className="nav-dropdown">
            <button
              type="button"
              className="nav-link nav-with-icon nav-button-reset"
              onClick={() => setHelpOpen((prev) => !prev)}
            >
              Help
              <IoChevronDownOutline className="nav-chevron" />
            </button>

            {helpOpen && (
              <div className="nav-dropdown-menu">
                <button type="button" onClick={() => goToProducts("?help=buyer-guide")}>
                  Buyer guide
                </button>
                <button type="button" onClick={() => goToProducts("?help=shipping")}>
                  Shipping info
                </button>
                <button type="button" onClick={() => navigate("/login")}>
                  Contact support
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="nav-right">
          <div className="nav-dropdown">
            <button
              type="button"
              className="nav-link nav-with-icon nav-button-reset"
              onClick={() => setCurrencyOpen((prev) => !prev)}
            >
              English, USD
              <IoChevronDownOutline className="nav-chevron" />
            </button>

            {currencyOpen && (
              <div className="nav-dropdown-menu nav-dropdown-menu-right">
                <button type="button">English, USD</button>
                <button type="button">English, EUR</button>
                <button type="button">English, GBP</button>
              </div>
            )}
          </div>

          <div className="nav-dropdown">
            <button
              type="button"
              className="nav-link nav-with-icon nav-button-reset"
              onClick={() => setShipOpen((prev) => !prev)}
            >
              Ship to 🇩🇪
              <IoChevronDownOutline className="nav-chevron" />
            </button>

            {shipOpen && (
              <div className="nav-dropdown-menu nav-dropdown-menu-right">
                <button type="button">Ship to 🇩🇪 Germany</button>
                <button type="button">Ship to 🇺🇸 USA</button>
                <button type="button">Ship to 🇬🇧 UK</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
