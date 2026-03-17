import React from "react";
import heroImg from "../../assets/hero-electronics.png";
import { FaUserCircle } from "react-icons/fa";

const HeroSection = () => {
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

  return (
    <section className="hero-section">
      <div className="categories-box">
        {categories.map((category, index) => (
          <div
            key={category}
            className={`category-item ${index === 0 ? "category-item-active" : ""}`}
          >
            {category}
          </div>
        ))}
      </div>

      <div className="banner-box">
        <img src={heroImg} alt="Electronic items" className="banner-image" />

        <div className="banner-overlay">
          <p className="banner-small-text">Latest trending</p>
          <h1 className="banner-title">Electronic items</h1>
          <button className="learn-more-btn">Learn more</button>
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

          <button className="join-btn">Join now</button>
          <button className="login-btn">Log in</button>
        </div>

        <div className="orange-card">
          <div>
            Get US $10 off <br />
            with a new <br />
            supplier
          </div>
        </div>

        <div className="teal-card">
          <div>
            Send quotes with <br />
            supplier <br />
            preferences
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
