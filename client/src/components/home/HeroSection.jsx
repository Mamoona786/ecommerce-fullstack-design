import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
  {
    id: 1,
    image: "/hero-electronics.png",
    smallText: "Latest trending",
    title: "Electronic items",
    buttonText: "Learn more",
    link: "/products?category=Computer%20and%20tech",
  },
  {
    id: 2,
    image: "/gadgets.png",
    smallText: "Best offers",
    title: "Gadgets and devices",
    buttonText: "Shop now",
    link: "/products?section=electronics",
  },
  {
    id: 3,
    image: "/home.png",
    smallText: "New arrivals",
    title: (
      <>
        Home and <br /> outdoor
      </>
    ),
    buttonText: "Explore",
    link: "/products?section=home-outdoor",
  },
];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

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
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`banner-slide ${
              index === currentSlide ? "banner-slide-active" : ""
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="banner-slide-image"
            />

            <div className="banner-overlay">
              <p className="banner-small-text">{slide.smallText}</p>
              <h1 className="banner-title">{slide.title}</h1>
              <button
                className="learn-more-btn"
                type="button"
                onClick={() => navigate(slide.link)}
              >
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}

        <div className="banner-dots">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`banner-dot ${
                index === currentSlide ? "banner-dot-active" : ""
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
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
            onClick={() => navigate("/register")}
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
