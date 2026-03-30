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
import { getAllProducts } from "../services/productService";

const heroIndoorImg = "/homeIndoor.png";
const heroElectronicsImg = "/electronics-gadgets.png";

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
        const backendProducts = Array.isArray(data?.products) ? data.products : [];
        setProducts(backendProducts);
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
    const homeMatches = products.filter((product) => {
      const categoryName = (product.category?.category_name || "").toLowerCase();
      const subCategory = (product.subCategory || "").toLowerCase();

      return (
        categoryName.includes("home") ||
        categoryName.includes("kitchen") ||
        categoryName.includes("garden") ||
        categoryName.includes("office") ||
        subCategory.includes("chairs") ||
        subCategory.includes("lighting") ||
        subCategory.includes("bedroom") ||
        subCategory.includes("cookware") ||
        subCategory.includes("blenders") ||
        subCategory.includes("juicers") ||
        subCategory.includes("kettles") ||
        subCategory.includes("storage") ||
        subCategory.includes("plants")
      );
    });

    const finalItems =
      homeMatches.length >= 8 ? homeMatches.slice(0, 8) : products.slice(0, 8);

    return finalItems.map((product) => ({
      id: product._id || product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category?.category_name || "",
      stock: product.stock,
      stockStatus: product.stockStatus,
    }));
  }, [products]);

  const electronicsItems = useMemo(() => {
    const electronicsMatches = products.filter((product) => {
      const categoryName = (product.category?.category_name || "").toLowerCase();
      const subCategory = (product.subCategory || "").toLowerCase();

      return (
        categoryName.includes("electronics") ||
        categoryName.includes("computer") ||
        categoryName.includes("mobile") ||
        subCategory.includes("wearables") ||
        subCategory.includes("cameras") ||
        subCategory.includes("audio") ||
        subCategory.includes("gaming") ||
        subCategory.includes("laptops") ||
        subCategory.includes("smartphones")
      );
    });

    const finalItems =
      electronicsMatches.length >= 8
        ? electronicsMatches.slice(0, 8)
        : products.slice(0, 8);

    return finalItems.map((product) => ({
      id: product._id || product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category?.category_name || "",
      stock: product.stock,
      stockStatus: product.stockStatus,
    }));
  }, [products]);

  const recommendedItems = useMemo(() => {
    return products.slice(0, 10).map((product) => ({
      id: product._id || product.id,
      image: product.image,
      price: product.price,
      title: product.name,
      subtitle:
        product.subtitle ||
        product.shortDescription ||
        product.subCategory ||
        product.category?.category_name ||
        "",
      category: product.category?.category_name || "",
      stock: product.stock,
      stockStatus: product.stockStatus,
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
