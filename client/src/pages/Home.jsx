import React from "react";
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

import heroIndoorImg from "../assets/homeIndoor.png";
import heroElectronicsImg from "../assets/electronics-gadgets.png";

import sofaAndChairImg from "../assets/sofa-and-chair.png";
import softChairsImg from "../assets/soft-chairs.png";
import kitchenDishesImg from "../assets/kitchen-dishes.png";
import smartWatchesImg from "../assets/smart-watches.png";
import kitchenMixerImg from "../assets/kitchen-mixer.png";
import blendersImg from "../assets/blenders.png";
import homeApplianceImg from "../assets/home-appliance.png";
import coffeeMakerImg from "../assets/coffee-maker.png";

import watchImg from "../assets/watch.png";
import laptopImg from "../assets/laptop.png";
import cameraImg from "../assets/camera.png";
import headsetImg from "../assets/headset.png";
import headphonesImg from "../assets/headphones.png";
import smartwatches1Img from "../assets/smart-watches1.png";
import smartphonesImg from "../assets/phone2.png";
import electricKattleImg from "../assets/electric-kattle.png";

import tshirtImg from "../assets/recommended-tshirt.png";
import jacketImg from "../assets/recommended-jacket.png";
import blazerImg from "../assets/recommended-blazer.png";
import walletBlueImg from "../assets/recommended-wallet-blue.png";
import backpackImg from "../assets/recommended-backpack.png";
import shortsImg from "../assets/recommended-shorts.png";

const homeOutdoorItems = [
  { id: 101, name: "Soft chairs", price: "USD 19", image: softChairsImg, category: "home" },
  { id: 102, name: "Sofa & chair", price: "USD 19", image: sofaAndChairImg, category: "home" },
  { id: 103, name: "Kitchen dishes", price: "USD 19", image: kitchenDishesImg, category: "home" },
  { id: 104, name: "Smart watches", price: "USD 19", image: smartWatchesImg, category: "home" },
  { id: 105, name: "Kitchen mixer", price: "USD 100", image: kitchenMixerImg, category: "home" },
  { id: 106, name: "Blenders", price: "USD 39", image: blendersImg, category: "home" },
  { id: 107, name: "Home appliance", price: "USD 19", image: homeApplianceImg, category: "home" },
  { id: 108, name: "Coffee maker", price: "USD 10", image: coffeeMakerImg, category: "home" },
];

const electronicsItems = [
  { id: 201, name: "Smart watches", price: "USD 19", image: watchImg, category: "electronics" },
  { id: 202, name: "Cameras", price: "USD 89", image: cameraImg, category: "electronics" },
  { id: 203, name: "Headphones", price: "USD 10", image: headphonesImg, category: "electronics" },
  { id: 204, name: "Smart watches", price: "USD 90", image: smartwatches1Img, category: "electronics" },
  { id: 205, name: "Gaming set", price: "USD 35", image: headsetImg, category: "electronics" },
  { id: 206, name: "Laptops & PC", price: "USD 340", image: laptopImg, category: "electronics" },
  { id: 207, name: "Smartphones", price: "USD 19", image: smartphonesImg, category: "electronics" },
  { id: 208, name: "Electric kettle", price: "USD 240", image: electricKattleImg, category: "electronics" },
];

const recommendedItems = [
  {
    id: 301,
    image: tshirtImg,
    price: "$10.30",
    title: "T-shirts with multiple",
    subtitle: "colors, for men",
    category: "fashion",
  },
  {
    id: 302,
    image: jacketImg,
    price: "$10.30",
    title: "Jeans shorts for men",
    subtitle: "blue color",
    category: "fashion",
  },
  {
    id: 303,
    image: blazerImg,
    price: "$12.50",
    title: "Brown winter coat",
    subtitle: "medium size",
    category: "fashion",
  },
  {
    id: 304,
    image: walletBlueImg,
    price: "$34.00",
    title: "Jeans bag for travel",
    subtitle: "for men",
    category: "fashion",
  },
  {
    id: 305,
    image: backpackImg,
    price: "$99.00",
    title: "Leather wallet",
    subtitle: "",
    category: "fashion",
  },
  {
    id: 306,
    image: shortsImg,
    price: "$9.99",
    title: "Canon camera",
    subtitle: "black, 100x zoom",
    category: "electronics",
  },
  {
    id: 307,
    image: headphonesImg,
    price: "$8.99",
    title: "Headset for gaming",
    subtitle: "with mic",
    category: "electronics",
  },
  {
    id: 308,
    image: backpackImg,
    price: "$10.30",
    title: "Smartwatch",
    subtitle: "silver color modern",
    category: "electronics",
  },
  {
    id: 309,
    image: smartWatchesImg,
    price: "$10.30",
    title: "Blue wallet for men",
    subtitle: "leather material",
    category: "fashion",
  },
  {
    id: 310,
    image: smartwatches1Img,
    price: "$80.95",
    title: "Jeans bag for travel",
    subtitle: "for men",
    category: "fashion",
  },
];

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <Navbar />

      <main className="main-content">
        <div className="container">
          <HeroSection />
          <DealsSection />

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
