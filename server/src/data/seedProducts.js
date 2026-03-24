import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Product from "../models/Product.js";

const sampleProducts = [
  {
    title: "Canon Camera EOS 2000, Black 10x zoom",
    image: "/src/assets/electric-kattle.png",
    thumbnails: [
      "/src/assets/shirt-1.png",
      "/src/assets/shirt-2.png",
      "/src/assets/shirt-3.png",
      "/src/assets/shirt-4.png",
      "/src/assets/shirt-5.png",
      "/src/assets/shirt-6.png"
    ],
    price: "$998.00",
    oldPrice: "$1128.00",
    rating: 7.5,
    orders: "154 orders",
    shipping: "Free Shipping",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    shortDescription:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    category: "Electronics",
    subtitle: "",
    reviews: 32,
    sold: 154,
    stockStatus: "In stock",
    priceTiers: [
      { price: "$98.00", qty: "50-100 pcs" },
      { price: "$90.00", qty: "100-700 pcs" },
      { price: "$78.00", qty: "700+ pcs" }
    ],
    specificationRows: [
      { label: "Price:", value: "Negotiable" },
      { label: "Type:", value: "Classic shoes" },
      { label: "Material:", value: "Plastic material" },
      { label: "Design:", value: "Modern nice" },
      { label: "Customization:", value: "Customized logo and design custom packages" },
      { label: "Protection:", value: "Refund Policy" },
      { label: "Warranty:", value: "2 years full warranty" }
    ],
    detailSpecRows: [
      { label: "Model", value: "#8786867" },
      { label: "Style", value: "Classic style" },
      { label: "Certificate", value: "ISO-898921212" },
      { label: "Size", value: "34mm x 450mm x 19mm" },
      { label: "Memory", value: "36GB RAM" }
    ],
    features: [
      "Some great feature name here",
      "Lorem ipsum dolor sit amet, consectetur",
      "Duis aute irure dolor in reprehenderit",
      "Some great feature name here"
    ],
    seller: {
      name: "Guanjoi Trading LLC",
      location: "Germany, Berlin",
      verified: true,
      shipping: "Worldwide shipping",
      logoLetter: "R"
    }
  },
  {
    title: "GoPro HERO6 4K Action Camera - Black",
    image: "/src/assets/phone.png",
    thumbnails: [
      "/src/assets/shirt-1.png",
      "/src/assets/shirt-2.png",
      "/src/assets/shirt-3.png",
      "/src/assets/shirt-4.png",
      "/src/assets/shirt-5.png",
      "/src/assets/shirt-6.png"
    ],
    price: "$998.00",
    category: "Electronics",
    reviews: 18,
    sold: 85,
    stockStatus: "In stock",
    seller: {
      name: "Guanjoi Trading LLC",
      location: "Germany, Berlin",
      verified: true,
      shipping: "Worldwide shipping",
      logoLetter: "R"
    }
  },
  {
    title: "Professional camera kit with lens bundle",
    image: "/src/assets/headphones.png",
    thumbnails: [
      "/src/assets/shirt-1.png",
      "/src/assets/shirt-2.png",
      "/src/assets/shirt-3.png",
      "/src/assets/shirt-4.png",
      "/src/assets/shirt-5.png",
      "/src/assets/shirt-6.png"
    ],
    price: "$998.00",
    category: "Electronics",
    reviews: 22,
    sold: 64,
    stockStatus: "In stock",
    seller: {
      name: "Guanjoi Trading LLC",
      location: "Germany, Berlin",
      verified: true,
      shipping: "Worldwide shipping",
      logoLetter: "R"
    }
  }
];

const seed = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    const inserted = await Product.insertMany(sampleProducts);
    console.log(`Seeded ${inserted.length} products`);
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seed();
