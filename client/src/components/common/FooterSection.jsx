import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";
import { BsBag } from "react-icons/bs";
import { IoChevronDownOutline } from "react-icons/io5";
import usaFlag from "../../assets/flag-us.jpg";

const FooterSection = () => {
  const [languageOpen, setLanguageOpen] = useState(false);

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand-column">
            <Link to="/" className="footer-brand">
              <div className="footer-brand-icon">
                <BsBag />
              </div>
              <h3 className="footer-brand-text">Brand</h3>
            </Link>

            <p className="footer-brand-description">
              Best information about the company
              <br />
              gies here but now lorem ipsum is
            </p>

            <div className="footer-socials">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-social">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-social">
                <FaLinkedinIn />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social">
                <FaInstagram />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="footer-social">
                <FaYoutube />
              </a>
            </div>
          </div>

          <div className="footer-links-column">
            <h4 className="footer-links-title">About</h4>
            <Link to="/" className="footer-link">About Us</Link>
            <Link to="/products" className="footer-link">Find store</Link>
            <Link to="/products" className="footer-link">Categories</Link>
            <Link to="/" className="footer-link">Blogs</Link>
          </div>

          <div className="footer-links-column">
            <h4 className="footer-links-title">Partnership</h4>
            <Link to="/" className="footer-link">About Us</Link>
            <Link to="/products" className="footer-link">Find store</Link>
            <Link to="/products" className="footer-link">Categories</Link>
            <Link to="/" className="footer-link">Blogs</Link>
          </div>

          <div className="footer-links-column">
            <h4 className="footer-links-title">Information</h4>
            <Link to="/" className="footer-link">Help Center</Link>
            <Link to="/" className="footer-link">Money Refund</Link>
            <Link to="/" className="footer-link">Shipping</Link>
            <Link to="/" className="footer-link">Contact us</Link>
          </div>

          <div className="footer-links-column">
            <h4 className="footer-links-title">For users</h4>
            <Link to="/login" className="footer-link">Login</Link>
            <Link to="/signup" className="footer-link">Register</Link>
            <Link to="/" className="footer-link">Settings</Link>
            <Link to="/cart" className="footer-link">My Orders</Link>
          </div>

          <div className="footer-app-column">
            <h4 className="footer-links-title">Get app</h4>

            <a href="/" className="store-badge apple-badge" onClick={(e) => e.preventDefault()}>
              <span className="store-badge-icon">
                <FaApple />
              </span>

              <span className="store-badge-content">
                <span className="store-badge-small">Download on the</span>
                <span className="store-badge-big">App Store</span>
              </span>
            </a>

            <a href="/" className="store-badge google-badge" onClick={(e) => e.preventDefault()}>
              <span className="store-badge-icon google-play-icon">
                <FaGooglePlay />
              </span>

              <span className="store-badge-content">
                <span className="store-badge-small">GET IT ON</span>
                <span className="store-badge-big">Google Play</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copy">© 2023 Ecommerce.</p>

          <div className="footer-language-dropdown">
            <button
              type="button"
              className="footer-language"
              onClick={() => setLanguageOpen((prev) => !prev)}
            >
              <img
                src={usaFlag}
                alt="English"
                className="footer-language-flag-image"
              />
              <span className="footer-language-text">English</span>
              <IoChevronDownOutline className="footer-language-arrow" />
            </button>

            {languageOpen && (
              <div className="footer-language-menu">
                <button type="button">English</button>
                <button type="button">Deutsch</button>
                <button type="button">Français</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
