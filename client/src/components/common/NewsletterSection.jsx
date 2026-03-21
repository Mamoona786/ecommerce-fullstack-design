import React, { useState } from "react";
import { FiMail } from "react-icons/fi";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    alert("Subscribed successfully!");
    setEmail("");
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-inner">
          <h2 className="newsletter-title">Subscribe on our newsletter</h2>
          <p className="newsletter-text">
            Get daily news on upcoming offers from many suppliers all over the world
          </p>

          <form className="newsletter-form" onSubmit={handleSubmit}>
            <div className="newsletter-input-wrap">
              <FiMail className="newsletter-input-icon" />
              <input
                type="email"
                className="newsletter-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
