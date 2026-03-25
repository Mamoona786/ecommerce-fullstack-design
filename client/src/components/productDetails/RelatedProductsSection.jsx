import React from "react";
import { useNavigate } from "react-router-dom";

const formatCurrency = (value) => `$${Number(value || 0).toFixed(2)}`;

function RelatedProductsSection({ items = [] }) {
  const navigate = useNavigate();

  return (
    <section className="related-products-section">
      <div className="related-products-card">
        <h2 className="related-products-title">Related products</h2>

        <div className="related-products-grid">
          {items.map((product) => {
            const productId = product._id || product.id;
            const productName = product.name || product.title;

            return (
              <article
                className="related-product-item"
                key={productId}
                onClick={() => navigate(`/products/${productId}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="related-product-image-wrap">
                  <img
                    src={product.image}
                    alt={productName}
                    className="related-product-image"
                  />
                </div>

                <h3 className="related-product-name">{productName}</h3>
                <p className="related-product-price">{formatCurrency(product.price)}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default RelatedProductsSection;
