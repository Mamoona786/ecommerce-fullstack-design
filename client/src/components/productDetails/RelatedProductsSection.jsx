import React from "react";

import item1 from "../../assets/laptop.png";
import item2 from "../../assets/phone.png";
import item3 from "../../assets/headphones.png";
import item4 from "../../assets/camera.png";
import item5 from "../../assets/watch.png";
import item6 from "../../assets/laptop.png";

const relatedProducts = [
  {
    id: 1,
    image: item1,
    title: "Xiaomi Redmi 8 Original",
    price: "$32.00-$40.00",
  },
  {
    id: 2,
    image: item2,
    title: "Xiaomi Redmi 8 Original",
    price: "$32.00-$40.00",
  },
  {
    id: 3,
    image: item3,
    title: "Xiaomi Redmi 8 Original",
    price: "$32.00-$40.00",
  },
  {
    id: 4,
    image: item4,
    title: "Xiaomi Redmi 8 Original",
    price: "$32.00-$40.00",
  },
  {
    id: 5,
    image: item5,
    title: "Xiaomi Redmi 8 Original",
    price: "$32.00-$40.00",
  },
  {
    id: 6,
    image: item6,
    title: "Xiaomi Redmi 8 Original",
    price: "$32.00-$40.00",
  },
];

function RelatedProductsSection() {
  return (
    <section className="related-products-section">
      <div className="related-products-card">
        <h2 className="related-products-title">Related products</h2>

        <div className="related-products-grid">
          {relatedProducts.map((product) => (
            <article className="related-product-item" key={product.id}>
              <div className="related-product-image-wrap">
                <img
                  src={product.image}
                  alt={product.title}
                  className="related-product-image"
                />
              </div>

              <h3 className="related-product-name">
                Xiaomi Redmi 8
                <br />
                Original
              </h3>
              <p className="related-product-price">{product.price}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RelatedProductsSection;
