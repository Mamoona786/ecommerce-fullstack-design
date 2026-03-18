import React from "react";
import quoteBgImg from "../../assets/quote-banner.png";

const QuoteSection = () => {
  return (
    <section
      className="quote-section"
      style={{ backgroundImage: `url(${quoteBgImg})` }}
    >
      <div className="quote-section-overlay" />

      <div className="quote-section-content">
        <div className="quote-left">
          <h2 className="quote-heading">
            An easy way to send
            <br />
            requests to all suppliers
          </h2>

          <p className="quote-description">
            Lorem ipsum dolor sit amet, consectetur adipisicing
            <br />
            elit, sed do eiusmod tempor incididunt.
          </p>
        </div>

        <div className="quote-form-card">
          <h3 className="quote-form-title">Send quote to suppliers</h3>

          <form className="quote-form">
            <input
              type="text"
              className="quote-input"
              placeholder="What item you need?"
            />

            <textarea
              className="quote-textarea"
              placeholder="Type more details"
            />

            <div className="quote-form-row">
              <input
                type="text"
                className="quote-input quote-qty-input"
                placeholder="Quantity"
              />

              <select className="quote-select">
                <option>Pcs</option>
                <option>Kg</option>
                <option>Boxes</option>
              </select>
            </div>

            <button type="submit" className="quote-submit-btn">
              Send inquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
