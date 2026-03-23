import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import FooterSection from "../components/common/FooterSection";
import NewsletterSection from "../components/common/NewsletterSection";
import ProductsBreadcrumb from "../components/products/ProductsBreadcrumb";
import ProductsSidebar from "../components/products/ProductsSidebar";
import ProductsToolbar from "../components/products/ProductsToolbar";
import ProductListCard from "../components/products/ProductListCard";
import ProductsPagination from "../components/products/ProductsPagination";
import { getAllProducts } from "../services/productService";
import "../styles/products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-page">
      <Header />
      <Navbar />

      <main className="products-main">
        <div className="container">
          <ProductsBreadcrumb />

          <div className="products-layout">
            <ProductsSidebar />

            <section className="products-content">
              <ProductsToolbar />

              {loading && <p>Loading products...</p>}
              {error && <p>{error}</p>}

              {!loading && !error && (
                <div className="products-list">
                  {products.map((product) => (
                    <ProductListCard key={product._id} product={product} />
                  ))}
                </div>
              )}

              <ProductsPagination />
            </section>
          </div>
        </div>
      </main>

      <NewsletterSection />
      <FooterSection />
    </div>
  );
}

export default Products;
