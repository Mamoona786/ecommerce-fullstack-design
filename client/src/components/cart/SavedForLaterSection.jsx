import React from "react";
import { FiShoppingCart } from "react-icons/fi";

const phoneImg = "/phone2.png";
const phone2Img = "/blue-phone2a.png";
const watchImg = "/watch.png";
const laptopImg = "/laptop.png";

const savedItems = [
  {
    id: 1,
    image: phoneImg,
    price: "$99.50",
    title: "Smartphone for daily use",
  },
  {
    id: 2,
    image: phone2Img,
    price: "$119.50",
    title: "Premium blue smartphone",
  },
  {
    id: 3,
    image: watchImg,
    price: "$89.50",
    title: "Smart watch with modern features",
  },
  {
    id: 4,
    image: laptopImg,
    price: "$699.00",
    title: "Reliable laptop for work and study",
  },
];

function SavedForLaterSection() {
  return (
    <section className="saved-later-section">
      <div className="saved-later-card">
        <h2 className="saved-later-title">Saved for later</h2>

        <div className="saved-later-grid">
          {savedItems.map((item) => (
            <article className="saved-later-item" key={item.id}>
              <div className="saved-later-image-wrap">
                <img
                  src={item.image}
                  alt={item.title}
                  className="saved-later-image"
                />
              </div>

              <p className="saved-later-price">{item.price}</p>
              <h3 className="saved-later-item-title">{item.title}</h3>

              <button type="button" className="saved-later-move-btn">
                <FiShoppingCart />
                <span>Move to cart</span>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SavedForLaterSection;
