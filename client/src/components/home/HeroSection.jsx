import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../../assets/hero-electronics.png";
import { FaUserCircle } from "react-icons/fa";

const HeroSection = () => {
  const navigate = useNavigate();
  const categories = [
    "Automobiles",
    "Clothes and wear",
    "Home interiors",
    "Computer and tech",
    "Tools, equipments",
    "Sports and outdoor",
    "Animal and pets",
    "Machinery tools",
    "More category",
  ];

  const [activeCategory, setActiveCategory] = useState("Automobiles");

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="hero-section">
      <div className="categories-box">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`category-item ${
              activeCategory === category ? "category-item-active" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="banner-box">
        <img src={heroImg} alt="Electronic items" className="banner-image" />

        <div className="banner-overlay">
          <p className="banner-small-text">Latest trending</p>
          <h1 className="banner-title">Electronic items</h1>
          <button
            className="learn-more-btn"
            type="button"
            onClick={() => navigate("/products?category=Computer%20and%20tech")}
          >
            Learn more
          </button>
        </div>
      </div>

      <div className="side-cards">
        <div className="user-card">
          <div className="user-top">
            <div className="user-avatar">
              <FaUserCircle />
            </div>
            <div>
              <p className="user-text">Hi, user</p>
              <p className="user-text">let&apos;s get started</p>
            </div>
          </div>

          <button
            className="join-btn"
            type="button"
            onClick={() => navigate("/signup")}
          >
            Join now
          </button>
          <button
            className="login-btn"
            type="button"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>
        </div>

        <button
          type="button"
          className="orange-card hero-side-card-btn"
          onClick={() => navigate("/products?promo=new-supplier")}
        >
          <div>
            Get US $10 off <br />
            with a new <br />
            supplier
          </div>
        </button>

        <button
          type="button"
          className="teal-card hero-side-card-btn"
          onClick={() => navigate("/products?promo=quotes")}
        >
          <div>
            Send quotes with <br />
            supplier <br />
            preferences
          </div>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
