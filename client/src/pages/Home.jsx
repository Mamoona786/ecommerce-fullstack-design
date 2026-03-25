import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/home/HeroSection";
import DealsSection from "../components/home/DealsSection";
import CategoryShowcaseSection from "../components/home/CategoryShowcaseSection";
import QuoteSection from "../components/home/QuoteSection";
import RecommendedSection from "../components/home/RecommendedSection";
import ExtraServicesSection from "../components/home/ExtraServicesSection";
import SuppliersSection from "../components/home/SuppliersSection";
import NewsletterSection from "../components/common/NewsletterSection";
import FooterSection from "../components/common/FooterSection";
import "../styles/home.css";

// import heroIndoorImg from "../assets/homeIndoor.png";
// import heroElectronicsImg from "../assets/electronics-gadgets.png";

const heroIndoorImg = "/homeIndoor.png";
const heroElectronicsImg = "/electronics-gadgets.png";

import { getAllProducts } from "../services/productService";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching products for home page:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchHomeProducts();
  }, []);

  const homeOutdoorItems = useMemo(() => {
    return products
      .filter((product) => {
        const category = (product.category || "").toLowerCase();
        return (
          category.includes("home") ||
          category.includes("kitchen") ||
          category.includes("appliance") ||
          category.includes("furniture")
        );
      })
      .slice(0, 8)
      .map((product) => ({
        id: product._id,
        name: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
      }));
  }, [products]);

  const electronicsItems = useMemo(() => {
    return products
      .filter((product) => {
        const category = (product.category || "").toLowerCase();
        return (
          category.includes("electronics") ||
          category.includes("electronic") ||
          category.includes("gadget") ||
          category.includes("tech")
        );
      })
      .slice(0, 8)
      .map((product) => ({
        id: product._id,
        name: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
      }));
  }, [products]);

  const recommendedItems = useMemo(() => {
    return products.slice(0, 10).map((product) => ({
      id: product._id,
      image: product.image,
      price: product.price,
      title: product.title,
      subtitle:
        product.subtitle ||
        product.shortDescription ||
        product.category ||
        "",
      category: product.category,
    }));
  }, [products]);

  return (
    <div className="home-page">
      <Header />
      <Navbar />

      <main className="main-content">
        <div className="container">
          <HeroSection />
          <DealsSection />

          {loading ? (
            <p style={{ padding: "20px 0" }}>Loading products...</p>
          ) : error ? (
            <p style={{ padding: "20px 0", color: "red" }}>{error}</p>
          ) : (
            <>
              <CategoryShowcaseSection
                sectionClass="home-outdoor-section"
                title={<>Home and outdoor</>}
                buttonText="Source now"
                bannerImage={heroIndoorImg}
                sectionLink="/products?section=home-outdoor"
                items={homeOutdoorItems}
              />

              <CategoryShowcaseSection
                sectionClass="electronics-section"
                title={<>Consumer electronics and gadgets</>}
                buttonText="Source now"
                bannerImage={heroElectronicsImg}
                sectionLink="/products?section=electronics"
                items={electronicsItems}
              />

              <QuoteSection />

              <RecommendedSection items={recommendedItems} />
            </>
          )}
        </div>

        <ExtraServicesSection />
        <SuppliersSection />
        <NewsletterSection />
      </main>

      <FooterSection />
    </div>
  );
};

export default Home;
