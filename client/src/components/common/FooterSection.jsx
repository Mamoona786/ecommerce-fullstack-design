import React from "react";
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
import usaFlag from "../../assets/flag-us.jpg";

const FooterSection = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand-column">
            <div className="footer-brand">
              <div className="footer-brand-icon">
                <BsBag />
              </div>
              <h3 className="footer-brand-text">Brand</h3>
            </div>

            <p className="footer-brand-description">
              Best information about the company
              <br />
              gies here but now lorem ipsum is
            </p>

            <div className="footer-socials">
              <a href="/" onClick={(e) => e.preventDefault()} className="footer-social">
                <FaFacebookF />
              </a>
              <a href="/" onClick={(e) => e.preventDefault()} className="footer-social">
                <FaTwitter />
              </a>
              <a href="/" onClick={(e) => e.preventDefault()} className="footer-social">
                <FaLinkedinIn />
              </a>
              <a href="/" onClick={(e) => e.preventDefault()} className="footer-social">
                <FaInstagram />
              </a>
              <a href="/" onClick={(e) => e.preventDefault()} className="footer-social">
                <FaYoutube />
              </a>
            </div>
          </div>

          <div className="footer-links-column">
            <h4 className="footer-links-title">About</h4>
            <a href="/" onClick={(e) => e.preventDefault()} className="footer-link">About Us</a>
            <a href="/" onClick={(e) => e.preventDefault()} className="footer-link">Find store</a>
            <a href="/" onClick={(e) => e.preventDefault()} className="footer-link">Categories</a>
            <a href="/" onClick={(e) => e.preventDefault()} className="footer-link">Blogs</a>
          </div>

          <div className="footer-links-column">
            <h4 className="footer-links-title">Partnership</h4>
            <a href="/" onClick={(e) => e.preventDefault()} className="footer-link">About Us</a>
            <a href="/" onClick={(e) => e.preventDefault()} className="footer-link">Find store</a>
            <a href="/" onClick={(e) => e.preventDefault()} className="footer-link">Categories</a>
            <a href="/" onClick={(e) => e.preventDefault()} className="footer-link">Blogs</a>
          </div>

          <div className="footer-links-column">
            <h4 className="footer-links-title">Information</h4>
            <a href="/" onClick={(e) => e.preventDefault()} className="footer-link">Help Center</a>
            <a href="/" onClick={(e) => e.preventDefault()} className="footer-link">Money Refund</a>
            <a href="/" onClick={(e) => e.preventDefault()} className="footer-link">Shipping</a>
            <a href="/" onClick={(e) => e.preventDefault()} className="footer-link">Contact us</a>
          </div>

          <div className="footer-links-column">
            <h4 className="footer-links-title">For users</h4>
            <a href="/" onClick={(e) => e.preventDefault()} className="footer-link">Login</a>
            <a href="/" onClick={(e) => e.preventDefault()} className="footer-link">Register</a>
            <a href="/" onClick={(e) => e.preventDefault()} className="footer-link">Settings</a>
            <a href="/" onClick={(e) => e.preventDefault()} className="footer-link">My Orders</a>
          </div>

          <div className="footer-app-column">
            <h4 className="footer-links-title">Get app</h4>

            <a
              href="/"
              onClick={(e) => e.preventDefault()}
              className="store-badge apple-badge"
            >
              <span className="store-badge-icon">
                <FaApple />
              </span>

              <span className="store-badge-content">
                <span className="store-badge-small">Download on the</span>
                <span className="store-badge-big">App Store</span>
              </span>
            </a>

            <a
              href="/"
              onClick={(e) => e.preventDefault()}
              className="store-badge google-badge"
            >
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

          <div className="footer-language">
              <img
                src={usaFlag}
                alt="English"
                className="footer-language-flag-image"
                />
                <span className="footer-language-text">English</span>
                <span className="footer-language-arrow">⌃</span>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
