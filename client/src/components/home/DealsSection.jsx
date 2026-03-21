import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import watchImg from "../../assets/watch.png";
import laptopImg from "../../assets/laptop.png";
import cameraImg from "../../assets/camera.png";
import headsetImg from "../../assets/headset.png";
import phoneImg from "../../assets/phone.png";

const INITIAL_TIME = {
  days: 4,
  hours: 13,
  minutes: 34,
  seconds: 56,
};

const getInitialSeconds = () => {
  return (
    INITIAL_TIME.days * 24 * 60 * 60 +
    INITIAL_TIME.hours * 60 * 60 +
    INITIAL_TIME.minutes * 60 +
    INITIAL_TIME.seconds
  );
};

const formatTime = (value) => String(value).padStart(2, "0");

const DealsSection = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(getInitialSeconds());

  const dealProducts = [
    { id: 1, name: "Smart watches", discount: "-25%", image: watchImg },
    { id: 2, name: "Laptops", discount: "-15%", image: laptopImg },
    { id: 3, name: "GoPro cameras", discount: "-40%", image: cameraImg },
    { id: 4, name: "Headphones", discount: "-25%", image: headsetImg },
    { id: 5, name: "Canon cameras", discount: "-25%", image: phoneImg },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const days = Math.floor(timeLeft / (24 * 60 * 60));
  const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
  const seconds = timeLeft % 60;

  return (
    <section className="deals-section">
      <div className="deals-intro">
        <h2 className="deals-title">Deals and offers</h2>
        <p className="deals-subtitle">Hygiene equipments</p>

        <div className="timer">
          <div className="time-box">
            <strong>{formatTime(days)}</strong>
            <span>Days</span>
          </div>
          <div className="time-box">
            <strong>{formatTime(hours)}</strong>
            <span>Hour</span>
          </div>
          <div className="time-box">
            <strong>{formatTime(minutes)}</strong>
            <span>Min</span>
          </div>
          <div className="time-box">
            <strong>{formatTime(seconds)}</strong>
            <span>Sec</span>
          </div>
        </div>
      </div>

      {dealProducts.map((product) => (
        <button
          key={product.id}
          type="button"
          className="product-card product-card-button"
          onClick={() => navigate(`/products?deal=${encodeURIComponent(product.name)}`)}
        >
          <div className="product-image-wrap">
            <img src={product.image} alt={product.name} className="product-image" />
          </div>
          <p className="product-name">{product.name}</p>
          <span className="discount-badge">{product.discount}</span>
        </button>
      ))}
    </section>
  );
};

export default DealsSection;
