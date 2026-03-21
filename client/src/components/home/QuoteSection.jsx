import React, { useState } from "react";
import quoteBgImg from "../../assets/quote-banner.png";

const QuoteSection = () => {
  const [formData, setFormData] = useState({
    item: "",
    details: "",
    quantity: "",
    unit: "Pcs",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Inquiry sent successfully!");
    setFormData({
      item: "",
      details: "",
      quantity: "",
      unit: "Pcs",
    });
  };

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

          <form className="quote-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="item"
              className="quote-input"
              placeholder="What item you need?"
              value={formData.item}
              onChange={handleChange}
            />

            <textarea
              name="details"
              className="quote-textarea"
              placeholder="Type more details"
              value={formData.details}
              onChange={handleChange}
            />

            <div className="quote-form-row">
              <input
                type="text"
                name="quantity"
                className="quote-input quote-qty-input"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleChange}
              />

              <select
                name="unit"
                className="quote-select"
                value={formData.unit}
                onChange={handleChange}
              >
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
