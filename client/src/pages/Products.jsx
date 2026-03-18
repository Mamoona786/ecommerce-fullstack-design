import React from "react";
import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import FooterSection from "../components/common/FooterSection";
import NewsletterSection from "../components/common/NewsletterSection";
import ProductsBreadcrumb from "../components/products/ProductsBreadcrumb";
import ProductsSidebar from "../components/products/ProductsSidebar";
import ProductsToolbar from "../components/products/ProductsToolbar";
import ProductListCard from "../components/products/ProductListCard";
import ProductsPagination from "../components/products/ProductsPagination";
import "../styles/products.css";

import kattleImg from "../assets/electric-kattle.jpg"
import phoneImg from "../assets/phone.jpg";
import phone2Img from "../assets/phone2.jpg";
import headphonesImg from "../assets/headphones.jpg";
import laptopImg from "../assets/laptop.jpg";
import watchImg from "../assets/watch.jpg";

const productsData = [
  {
    id: 1,
    image: kattleImg,
    title: "Canon Cmera EOS 2000, Black 10x zoom",
    price: "$998.00",
    oldPrice: "$1128.00",
    rating: "7.5",
    orders: "154 orders",
    shipping: "Free Shipping",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    id: 2,
    image: phoneImg,
    title: "GoPro HERO6 4K Action Camera - Black",
    price: "$998.00",
    oldPrice: "",
    rating: "7.5",
    orders: "154 orders",
    shipping: "Free Shipping",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit",
  },
  {
    id: 3,
    image: phone2Img,
    title: "GoPro HERO6 4K Action Camera - Black",
    price: "$998.00",
    oldPrice: "",
    rating: "7.5",
    orders: "154 orders",
    shipping: "Free Shipping",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit",
  },
  {
    id: 4,
    image: laptopImg,
    title: "GoPro HERO6 4K Action Camera - Black",
    price: "$998.00",
    oldPrice: "",
    rating: "7.5",
    orders: "154 orders",
    shipping: "Free Shipping",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit",
  },
  {
    id: 5,
    image: watchImg,
    title: "GoPro HERO6 4K Action Camera - Black",
    price: "$998.00",
    oldPrice: "$1128.00",
    rating: "7.5",
    orders: "154 orders",
    shipping: "Free Shipping",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit",
  },
  {
    id: 6,
    image: headphonesImg,
    title: "Professional camera kit with lens bundle",
    price: "$998.00",
    oldPrice: "",
    rating: "7.5",
    orders: "154 orders",
    shipping: "Free Shipping",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
];

function Products() {
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

              <div className="products-list">
                {productsData.map((product) => (
                  <ProductListCard key={product.id} product={product} />
                ))}
              </div>

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
