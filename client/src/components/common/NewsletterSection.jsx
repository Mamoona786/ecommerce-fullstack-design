import React from "react";
import { FiMail } from "react-icons/fi";

const NewsletterSection = () => {
  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-inner">
          <h2 className="newsletter-title">Subscribe on our newsletter</h2>
          <p className="newsletter-text">
            Get daily news on upcoming offers from many suppliers all over the world
          </p>

          <form className="newsletter-form">
            <div className="newsletter-input-wrap">
              <FiMail className="newsletter-input-icon" />
              <input
                type="email"
                className="newsletter-input"
                placeholder="Email"
              />
            </div>

            <button type="submit" className="newsletter-btn">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
