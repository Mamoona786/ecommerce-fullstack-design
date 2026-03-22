import React from "react";
import { useNavigate } from "react-router-dom";

function RelatedProductsSection({ items = [] }) {
  const navigate = useNavigate();

  return (
    <section className="related-products-section">
      <div className="related-products-card">
        <h2 className="related-products-title">Related products</h2>

        <div className="related-products-grid">
          {items.map((product) => (
            <article
              className="related-product-item"
              key={product.id}
              onClick={() => navigate(`/products/${product.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="related-product-image-wrap">
                <img
                  src={product.image}
                  alt={product.title}
                  className="related-product-image"
                />
              </div>

              <h3 className="related-product-name">{product.title}</h3>
              <p className="related-product-price">{product.price}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RelatedProductsSection;
