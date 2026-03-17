import React from "react";
import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/home/HeroSection";
import DealsSection from "../components/home/DealsSection";
import CategoryShowcaseSection from "../components/home/CategoryShowcaseSection";
import "../styles/home.css";

// ✅ IMPORT IMAGES PROPERLY
import heroIndoorImg from "../assets/hero.png";
import heroElectronicsImg from "../assets/hero-electronics.jpg";

import watchImg from "../assets/watch.jpg";
import laptopImg from "../assets/laptop.jpg";
import cameraImg from "../assets/camera.jpg";
import headsetImg from "../assets/headset.jpg";
import phoneImg from "../assets/phone.jpg";

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <Navbar />

      <main className="main-content">
        <div className="container">
          <HeroSection />
          <DealsSection />

          {/* HOME & OUTDOOR */}
          <CategoryShowcaseSection
            sectionClass="home-outdoor-section"
            title={<>Home and outdoor</>}
            buttonText="Source now"
            bannerImage={heroIndoorImg}
            items={[
              { name: "Soft chairs", price: "USD 19", image: watchImg },
              { name: "Sofa & chair", price: "USD 19", image: laptopImg },
              { name: "Kitchen dishes", price: "USD 19", image: phoneImg },
              { name: "Smart watches", price: "USD 19", image: cameraImg },
              { name: "Kitchen mixer", price: "USD 100", image: headsetImg },
              { name: "Blenders", price: "USD 39", image: phoneImg },
              { name: "Home appliance", price: "USD 19", image: laptopImg },
              { name: "Coffee maker", price: "USD 10", image: watchImg },
            ]}
          />

          {/* ELECTRONICS */}
          <CategoryShowcaseSection
            sectionClass="electronics-section"
            title={<>Consumer electronics and gadgets</>}
            buttonText="Source now"
            bannerImage={heroElectronicsImg}
            items={[
              { name: "Smart watches", price: "USD 19", image: watchImg },
              { name: "Cameras", price: "USD 89", image: cameraImg },
              { name: "Headphones", price: "USD 10", image: headsetImg },
              { name: "Smart watches", price: "USD 90", image: phoneImg },
              { name: "Gaming set", price: "USD 35", image: headsetImg },
              { name: "Laptops & PC", price: "USD 340", image: laptopImg },
              { name: "Smartphones", price: "USD 19", image: phoneImg },
              { name: "Electric kettle", price: "USD 240", image: phoneImg },
            ]}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
