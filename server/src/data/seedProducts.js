import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

const commonSeller = {
  name: "Guanjoi Trading LLC",
  location: "Germany, Berlin",
  verified: true,
  shipping: "Worldwide shipping",
  logoLetter: "R",
};

const createProduct = ({
  name,
  image,
  thumbnails = [],
  price,
  oldPrice = 0,
  categoryName,
  subCategory = "",
  brand = "",
  sku = "",
  subtitle = "",
  description = "",
  shortDescription = "",
  rating = 4.5,
  reviews = 0,
  sold = 0,
  stock = 0,
  orders = "0 orders",
  shipping = "Free Shipping",
  priceTiers = [],
  specificationRows = [],
  detailSpecRows = [],
  features = [],
  isActive = true,
}) => ({
  name,
  image,
  thumbnails,
  price,
  oldPrice,
  categoryName,
  subCategory,
  brand,
  sku,
  subtitle,
  description,
  shortDescription,
  rating,
  reviews,
  sold,
  stock,
  orders,
  shipping,
  priceTiers,
  specificationRows,
  detailSpecRows,
  features,
  seller: commonSeller,
  isActive,
});

const rawProducts = [
  createProduct({
    name: "Soft Chairs",
    image: "/soft-chairs.png",
    thumbnails: [
      "/soft-chairs.png",
      "/soft-chairs2.png",
      "/soft-chairs3.png",
      "/soft-chairs4.png",
      "/soft-chairs5.png",
      "/soft-chairs6.png",
    ],
    price: 79,
    oldPrice: 99,
    categoryName: "Home & Living",
    subCategory: "Chairs",
    brand: "ComfortNest",
    sku: "CHR-SFT-001",
    subtitle: "Comfortable accent chairs for living rooms and lounges",
    description:
      "These soft chairs are designed for everyday comfort with a modern silhouette, supportive cushioning, and durable upholstery. They are a perfect fit for living rooms, bedrooms, reading corners, and stylish office spaces.",
    shortDescription:
      "Modern upholstered soft chairs with premium cushioning, elegant design, and durable finish for daily home use.",
    rating: 4.6,
    reviews: 86,
    sold: 154,
    stock: 8,
    orders: "154 orders",
    priceTiers: [
      { price: 79, qty: "1-9 pcs" },
      { price: 74, qty: "10-49 pcs" },
      { price: 69, qty: "50+ pcs" },
    ],
    specificationRows: [
      { label: "Price:", value: "79" },
      { label: "Type:", value: "Accent Chair" },
      { label: "Material:", value: "Fabric + Wooden Frame" },
      { label: "Design:", value: "Modern" },
      { label: "Customization:", value: "Available for bulk orders" },
      { label: "Protection:", value: "7-day return policy" },
      { label: "Warranty:", value: "1 year warranty" },
    ],
    detailSpecRows: [
      { label: "Model", value: "CN-SC-101" },
      { label: "Style", value: "Modern Minimalist" },
      { label: "Certificate", value: "ISO-9001" },
      { label: "Size", value: "78 x 72 x 84 cm" },
      { label: "Weight Capacity", value: "120 kg" },
    ],
    features: [
      "Soft cushioned seating",
      "Modern decorative design",
      "Strong wooden frame",
      "Suitable for home and office use",
    ],
  }),

  createProduct({
    name: "Lamp",
    image: "/lamp.png",
    thumbnails: [
      "/lamp.png",
      "/lamp2.png",
      "/lamp3.png",
      "/lamp4.png",
      "/lamp5.png",
      "/lamp6.png",
    ],
    price: 45,
    oldPrice: 59,
    categoryName: "Home & Living",
    subCategory: "Lighting",
    brand: "LumaHome",
    sku: "LMP-HM-002",
    subtitle: "Elegant decorative lamp for bedrooms and side tables",
    description:
      "This stylish home lamp adds warmth and elegance to any interior. It is ideal for bedside tables, study corners, and lounge spaces where soft lighting and modern aesthetics are needed.",
    shortDescription:
      "Decorative modern lamp with warm ambient lighting and elegant finish for bedrooms and living spaces.",
    rating: 4.4,
    reviews: 41,
    sold: 73,
    stock: 6,
    orders: "73 orders",
    priceTiers: [
      { price: 45, qty: "1-9 pcs" },
      { price: 41, qty: "10-49 pcs" },
      { price: 38, qty: "50+ pcs" },
    ],
    specificationRows: [
      { label: "Price:", value: "45" },
      { label: "Type:", value: "Table Lamp" },
      { label: "Material:", value: "Metal + Fabric Shade" },
      { label: "Design:", value: "Contemporary" },
      { label: "Customization:", value: "No" },
      { label: "Protection:", value: "7-day return policy" },
      { label: "Warranty:", value: "1 year electrical warranty" },
    ],
    detailSpecRows: [
      { label: "Model", value: "LH-TL-204" },
      { label: "Style", value: "Decorative Modern" },
      { label: "Certificate", value: "CE Certified" },
      { label: "Size", value: "48 x 18 cm" },
      { label: "Power", value: "12W" },
    ],
    features: [
      "Soft warm lighting",
      "Decorative premium look",
      "Compact side-table design",
      "Low power consumption",
    ],
  }),

  createProduct({
    name: "Mattress",
    image: "/mattress.png",
    thumbnails: [
      "/mattress.png",
      "/mattress2.png",
      "/mattress3.png",
      "/mattress4.png",
      "/mattress5.png",
      "/mattress6.png",
    ],
    price: 220,
    oldPrice: 260,
    categoryName: "Home & Living",
    subCategory: "Bedroom",
    brand: "SleepEase",
    sku: "MAT-BR-003",
    subtitle: "Comfortable mattress designed for better sleep support",
    description:
      "This mattress provides balanced support and comfort for restful sleep. It is suitable for daily use and made with high-quality layered foam construction for durability and body alignment.",
    shortDescription:
      "Premium comfort mattress with soft feel, supportive layers, and durable materials for everyday sleeping comfort.",
    rating: 4.7,
    reviews: 58,
    sold: 97,
    stock: 4,
    orders: "97 orders",
    priceTiers: [
      { price: 220, qty: "1-4 pcs" },
      { price: 210, qty: "5-19 pcs" },
      { price: 199, qty: "20+ pcs" },
    ],
    specificationRows: [
      { label: "Price:", value: "220" },
      { label: "Type:", value: "Foam Mattress" },
      { label: "Material:", value: "High Density Foam" },
      { label: "Design:", value: "Orthopedic Comfort" },
      { label: "Customization:", value: "Custom sizes available" },
      { label: "Protection:", value: "10-day replacement policy" },
      { label: "Warranty:", value: "3 years warranty" },
    ],
    detailSpecRows: [
      { label: "Model", value: "SE-MT-330" },
      { label: "Style", value: "Modern Comfort" },
      { label: "Certificate", value: "ISO-9001" },
      { label: "Size", value: "78 x 60 x 8 inches" },
      { label: "Firmness", value: "Medium Soft" },
    ],
    features: [
      "Body support comfort layers",
      "Breathable fabric surface",
      "Durable foam construction",
      "Ideal for daily sleeping use",
    ],
  }),

  createProduct({
    name: "Cooking Pot",
    image: "/pot.png",
    thumbnails: [
      "/pot.png",
      "/pot2.png",
      "/pot3.png",
      "/pot4.png",
      "/pot5.png",
      "/pot6.png",
    ],
    price: 34,
    oldPrice: 44,
    categoryName: "Kitchen & Dining",
    subCategory: "Cookware",
    brand: "CookElite",
    sku: "POT-KT-004",
    subtitle: "Durable cooking pot for modern kitchen use",
    description:
      "A practical and durable cooking pot suitable for boiling, cooking, and meal preparation. Built with sturdy material and an easy-grip design for reliable everyday kitchen performance.",
    shortDescription:
      "Strong and stylish cooking pot for boiling, cooking, and serving daily family meals.",
    rating: 4.3,
    reviews: 37,
    sold: 68,
    stock: 10,
    orders: "68 orders",
    priceTiers: [
      { price: 34, qty: "1-19 pcs" },
      { price: 31, qty: "20-49 pcs" },
      { price: 28, qty: "50+ pcs" },
    ],
    specificationRows: [
      { label: "Price:", value: "34" },
      { label: "Type:", value: "Cookware Pot" },
      { label: "Material:", value: "Stainless Steel" },
      { label: "Design:", value: "Classic Kitchen" },
      { label: "Customization:", value: "No" },
      { label: "Protection:", value: "7-day return policy" },
      { label: "Warranty:", value: "1 year warranty" },
    ],
    detailSpecRows: [
      { label: "Model", value: "CE-PT-450" },
      { label: "Style", value: "Everyday Kitchen" },
      { label: "Certificate", value: "Food Safe Certified" },
      { label: "Size", value: "24 cm" },
      { label: "Capacity", value: "4.5L" },
    ],
    features: [
      "Heat-resistant handles",
      "Durable metal body",
      "Suitable for daily cooking",
      "Easy to clean surface",
    ],
  }),

  createProduct({
    name: "Juicer",
    image: "/juicer.png",
    thumbnails: [
      "/juicer.png",
      "/juicer2.png",
      "/juicer3.png",
      "/juicer4.png",
      "/juicer5.png",
      "/juicer6.png",
    ],
    price: 95,
    oldPrice: 120,
    categoryName: "Kitchen Appliances",
    subCategory: "Juicers",
    brand: "FreshMix",
    sku: "JCR-KA-005",
    subtitle: "Powerful juicer for fresh fruits and vegetables",
    description:
      "This juicer is designed for efficient juice extraction with a strong motor and easy-clean components. It is ideal for fresh orange juice, mixed fruit drinks, and daily healthy kitchen routines.",
    shortDescription:
      "High-performance juicer with efficient extraction, strong motor, and easy cleaning design.",
    rating: 4.5,
    reviews: 49,
    sold: 81,
    stock: 5,
    orders: "81 orders",
    priceTiers: [
      { price: 95, qty: "1-9 pcs" },
      { price: 89, qty: "10-29 pcs" },
      { price: 84, qty: "30+ pcs" },
    ],
    specificationRows: [
      { label: "Price:", value: "95" },
      { label: "Type:", value: "Electric Juicer" },
      { label: "Material:", value: "ABS + Stainless Steel" },
      { label: "Design:", value: "Compact Modern" },
      { label: "Customization:", value: "No" },
      { label: "Protection:", value: "7-day return policy" },
      { label: "Warranty:", value: "1 year motor warranty" },
    ],
    detailSpecRows: [
      { label: "Model", value: "FM-JC-510" },
      { label: "Style", value: "Countertop Appliance" },
      { label: "Certificate", value: "CE Certified" },
      { label: "Size", value: "32 x 20 x 38 cm" },
      { label: "Power", value: "800W" },
    ],
    features: [
      "Efficient juice extraction",
      "Strong motor performance",
      "Easy-to-clean detachable parts",
      "Ideal for home kitchen use",
    ],
  }),

  createProduct({
    name: "Blender",
    image: "/blender.png",
    thumbnails: [
      "/blender.png",
      "/blender2.png",
      "/blender3.png",
      "/blender4.png",
      "/blender5.png",
      "/blender6.png",
    ],
    price: 59,
    oldPrice: 75,
    categoryName: "Kitchen Appliances",
    subCategory: "Blenders",
    brand: "BlendPro",
    sku: "BLD-KA-006",
    subtitle: "Versatile blender for smoothies, sauces, and shakes",
    description:
      "A practical kitchen blender built for smoothies, milkshakes, sauces, and everyday food preparation. Its compact body, sharp blades, and reliable motor make it suitable for regular home use.",
    shortDescription:
      "Reliable home blender for smoothies, juices, sauces, and everyday kitchen mixing tasks.",
    rating: 4.4,
    reviews: 54,
    sold: 102,
    stock: 7,
    orders: "102 orders",
    priceTiers: [
      { price: 59, qty: "1-9 pcs" },
      { price: 54, qty: "10-39 pcs" },
      { price: 49, qty: "40+ pcs" },
    ],
    specificationRows: [
      { label: "Price:", value: "59" },
      { label: "Type:", value: "Kitchen Blender" },
      { label: "Material:", value: "ABS + Glass Jar" },
      { label: "Design:", value: "Compact Modern" },
      { label: "Customization:", value: "No" },
      { label: "Protection:", value: "7-day return policy" },
      { label: "Warranty:", value: "1 year warranty" },
    ],
    detailSpecRows: [
      { label: "Model", value: "BP-BL-620" },
      { label: "Style", value: "Countertop" },
      { label: "Certificate", value: "CE Certified" },
      { label: "Size", value: "36 x 18 cm" },
      { label: "Power", value: "700W" },
    ],
    features: [
      "Sharp stainless blades",
      "Multi-purpose blending use",
      "Compact countertop design",
      "Easy control operation",
    ],
  }),

  createProduct({
    name: "Modern File Rack",
    image: "/modern-file-rack.png",
    thumbnails: [
      "/modern-file-rack.png",
      "/modern-file-rack2.png",
      "/modern-file-rack3.png",
      "/modern-file-rack4.png",
      "/modern-file-rack5.png",
      "/modern-file-rack6.png",
    ],
    price: 68,
    oldPrice: 82,
    categoryName: "Office & Storage",
    subCategory: "Storage Rack",
    brand: "SpaceLine",
    sku: "RCK-OF-007",
    subtitle: "Modern storage rack for files, décor, and essentials",
    description:
      "This modern file rack is perfect for organizing books, documents, decorative items, and office essentials. Its clean design makes it suitable for both home and workspace interiors.",
    shortDescription:
      "Stylish multi-purpose rack for organizing files, books, and decorative accessories.",
    rating: 4.5,
    reviews: 29,
    sold: 46,
    stock: 3,
    orders: "46 orders",
    priceTiers: [
      { price: 68, qty: "1-9 pcs" },
      { price: 63, qty: "10-24 pcs" },
      { price: 58, qty: "25+ pcs" },
    ],
    specificationRows: [
      { label: "Price:", value: "68" },
      { label: "Type:", value: "Storage Rack" },
      { label: "Material:", value: "Engineered Wood + Metal" },
      { label: "Design:", value: "Modern Open Shelf" },
      { label: "Customization:", value: "Available on request" },
      { label: "Protection:", value: "7-day return policy" },
      { label: "Warranty:", value: "1 year warranty" },
    ],
    detailSpecRows: [
      { label: "Model", value: "SL-RK-110" },
      { label: "Style", value: "Modern Utility" },
      { label: "Certificate", value: "ISO-9001" },
      { label: "Size", value: "120 x 35 x 180 cm" },
      { label: "Shelves", value: "5 layers" },
    ],
    features: [
      "Multi-purpose storage use",
      "Modern open design",
      "Strong shelf structure",
      "Ideal for home and office",
    ],
  }),

  createProduct({
    name: "Plant",
    image: "/plant.png",
    thumbnails: [
      "/plant.png",
      "/plant2.png",
      "/plant3.png",
      "/plant4.png",
      "/plant5.png",
      "/plant6.png",
    ],
    price: 22,
    oldPrice: 29,
    categoryName: "Home & Garden",
    subCategory: "Indoor Plants",
    brand: "GreenNest",
    sku: "PLT-GR-008",
    subtitle: "Decorative indoor plant for fresh and elegant spaces",
    description:
      "A beautiful indoor plant that adds freshness, style, and a calming natural touch to your living room, bedroom, office desk, or balcony area.",
    shortDescription:
      "Elegant indoor decorative plant for modern homes, offices, and stylish interiors.",
    rating: 4.6,
    reviews: 23,
    sold: 40,
    stock: 9,
    orders: "40 orders",
    priceTiers: [
      { price: 22, qty: "1-19 pcs" },
      { price: 20, qty: "20-49 pcs" },
      { price: 18, qty: "50+ pcs" },
    ],
    specificationRows: [
      { label: "Price:", value: "22" },
      { label: "Type:", value: "Indoor Decorative Plant" },
      { label: "Material:", value: "Natural Plant + Pot" },
      { label: "Design:", value: "Minimal Modern" },
      { label: "Customization:", value: "Pot color may vary" },
      { label: "Protection:", value: "Fresh delivery support" },
      { label: "Warranty:", value: "No warranty" },
    ],
    detailSpecRows: [
      { label: "Model", value: "GN-PL-212" },
      { label: "Style", value: "Indoor Décor" },
      { label: "Certificate", value: "N/A" },
      { label: "Size", value: "45 cm height" },
      { label: "Pot Type", value: "Ceramic Pot" },
    ],
    features: [
      "Fresh natural look",
      "Perfect indoor décor item",
      "Easy placement design",
      "Suitable for homes and offices",
    ],
  }),

  createProduct({
    name: "Smart Watch",
    image: "/watch.png",
    thumbnails: [
      "/watch.png",
      "/watch2.png",
      "/watch3.png",
      "/watch4.png",
      "/watch5.png",
      "/watch6.png",
    ],
    price: 129,
    oldPrice: 159,
    categoryName: "Electronics",
    subCategory: "Wearables",
    brand: "TechTime",
    sku: "SWT-EL-009",
    subtitle: "Feature-rich smart watch for fitness and daily productivity",
    description:
      "This smart watch offers modern design, activity tracking, notifications, and convenient daily features for users who want functionality and style in one wearable device.",
    shortDescription:
      "Modern smart watch with activity tracking, notifications, and stylish wearable design.",
    rating: 4.5,
    reviews: 92,
    sold: 170,
    stock: 6,
    orders: "170 orders",
    priceTiers: [
      { price: 129, qty: "1-9 pcs" },
      { price: 122, qty: "10-29 pcs" },
      { price: 115, qty: "30+ pcs" },
    ],
    specificationRows: [
      { label: "Price:", value: "129" },
      { label: "Type:", value: "Smart Watch" },
      { label: "Material:", value: "Aluminum + Silicone Strap" },
      { label: "Design:", value: "Premium Digital" },
      { label: "Customization:", value: "No" },
      { label: "Protection:", value: "7-day return policy" },
      { label: "Warranty:", value: "1 year warranty" },
    ],
    detailSpecRows: [
      { label: "Model", value: "TT-SW-01" },
      { label: "Style", value: "Wearable" },
      { label: "Certificate", value: "CE / RoHS" },
      { label: "Size", value: "44mm" },
      { label: "Battery", value: "Up to 5 days" },
    ],
    features: [
      "Fitness and step tracking",
      "Call and message alerts",
      "Modern wearable design",
      "Comfortable wrist strap",
    ],
  }),

  createProduct({
    name: "Camera",
    image: "/camera.png",
    thumbnails: [
      "/camera.png",
      "/camera2.png",
      "/camera3.png",
      "/camera4.png",
      "/camera5.png",
      "/camera6.png",
    ],
    price: 289,
    oldPrice: 329,
    categoryName: "Electronics",
    subCategory: "Cameras",
    brand: "SnapPro",
    sku: "CAM-EL-010",
    subtitle: "High-quality digital camera for sharp and detailed shots",
    description:
      "A compact digital camera designed for clear photography, smooth handling, and everyday content capture. Suitable for travel, product shots, family events, and hobby photography.",
    shortDescription:
      "Compact digital camera with sharp image quality and easy-to-use controls.",
    rating: 4.6,
    reviews: 63,
    sold: 88,
    stock: 4,
    orders: "88 orders",
    priceTiers: [
      { price: 289, qty: "1-4 pcs" },
      { price: 278, qty: "5-14 pcs" },
      { price: 265, qty: "15+ pcs" },
    ],
    specificationRows: [
      { label: "Price:", value: "289" },
      { label: "Type:", value: "Digital Camera" },
      { label: "Material:", value: "ABS + Glass Lens" },
      { label: "Design:", value: "Portable Compact" },
      { label: "Customization:", value: "No" },
      { label: "Protection:", value: "7-day return policy" },
      { label: "Warranty:", value: "1 year warranty" },
    ],
    detailSpecRows: [
      { label: "Model", value: "SP-CM-900" },
      { label: "Style", value: "Compact Shooter" },
      { label: "Certificate", value: "CE" },
      { label: "Size", value: "110 x 68 x 42 mm" },
      { label: "Resolution", value: "24MP" },
    ],
    features: [
      "Sharp image capture",
      "Compact travel-friendly body",
      "Easy control access",
      "Suitable for casual photography",
    ],
  }),

  createProduct({
    name: "White Headphones",
    image: "/white-headphones.png",
    thumbnails: [
      "/white-headphones.png",
      "/white-headphones2.png",
      "/white-headphones3.png",
      "/white-headphones4.png",
      "/white-headphones5.png",
      "/white-headphones6.png",
    ],
    price: 49,
    oldPrice: 65,
    categoryName: "Electronics",
    subCategory: "Audio",
    brand: "SoundBeat",
    sku: "HPH-EL-011",
    subtitle: "Comfortable over-ear headphones with balanced sound",
    description:
      "These white headphones combine comfort, elegant design, and clear audio performance for music, calls, and entertainment. The cushioned earcups are ideal for extended listening sessions.",
    shortDescription:
      "Over-ear headphones with clear sound, soft ear cushions, and stylish white finish.",
    rating: 4.4,
    reviews: 57,
    sold: 93,
    stock: 11,
    orders: "93 orders",
    priceTiers: [
      { price: 49, qty: "1-14 pcs" },
      { price: 45, qty: "15-39 pcs" },
      { price: 42, qty: "40+ pcs" },
    ],
    specificationRows: [
      { label: "Price:", value: "49" },
      { label: "Type:", value: "Over-Ear Headphones" },
      { label: "Material:", value: "ABS + Soft Cushion" },
      { label: "Design:", value: "Modern Audio" },
      { label: "Customization:", value: "No" },
      { label: "Protection:", value: "7-day return policy" },
      { label: "Warranty:", value: "6 months warranty" },
    ],
    detailSpecRows: [
      { label: "Model", value: "SB-WH-77" },
      { label: "Style", value: "Over-Ear" },
      { label: "Certificate", value: "CE" },
      { label: "Size", value: "Adjustable headband" },
      { label: "Connectivity", value: "Wired/Wireless variant" },
    ],
    features: [
      "Comfortable ear cushions",
      "Balanced stereo sound",
      "Elegant white design",
      "Suitable for long listening sessions",
    ],
  }),

  createProduct({
    name: "Electric Kettle",
    image: "/electric-kattle.png",
    thumbnails: [
      "/electric-kattle.png",
      "/electric-kattle2.png",
      "/electric-kattle3.png",
      "/electric-kattle4.png",
      "/electric-kattle5.png",
      "/electric-kattle6.png",
    ],
    price: 42,
    oldPrice: 55,
    categoryName: "Kitchen Appliances",
    subCategory: "Kettles",
    brand: "QuickBoil",
    sku: "KTL-KA-012",
    subtitle: "Fast boiling electric kettle for tea and daily kitchen use",
    description:
      "This electric kettle is designed for fast water heating with a practical handle, easy-pour spout, and modern body style. It is ideal for tea, coffee, and quick kitchen preparation.",
    shortDescription:
      "Fast-heating electric kettle with easy-grip handle and modern countertop design.",
    rating: 4.3,
    reviews: 39,
    sold: 71,
    stock: 2,
    orders: "71 orders",
    priceTiers: [
      { price: 42, qty: "1-19 pcs" },
      { price: 39, qty: "20-49 pcs" },
      { price: 36, qty: "50+ pcs" },
    ],
    specificationRows: [
      { label: "Price:", value: "42" },
      { label: "Type:", value: "Electric Kettle" },
      { label: "Material:", value: "Stainless Steel + Plastic" },
      { label: "Design:", value: "Compact Modern" },
      { label: "Customization:", value: "No" },
      { label: "Protection:", value: "7-day return policy" },
      { label: "Warranty:", value: "1 year warranty" },
    ],
    detailSpecRows: [
      { label: "Model", value: "QB-EK-55" },
      { label: "Style", value: "Countertop" },
      { label: "Certificate", value: "CE" },
      { label: "Size", value: "1.8L" },
      { label: "Power", value: "1500W" },
    ],
    features: [
      "Fast water heating",
      "Comfortable handle grip",
      "Ideal for tea and coffee",
      "Compact kitchen appliance",
    ],
  }),

  createProduct({
    name: "Gaming Headphones",
    image: "/black-headset.png",
    thumbnails: [
      "/black-headset.png",
      "/black-headset2.png",
      "/black-headset3.png",
      "/black-headset4.png",
      "/black-headset5.png",
      "/black-headset6.png",
    ],
    price: 69,
    oldPrice: 89,
    categoryName: "Electronics",
    subCategory: "Gaming Audio",
    brand: "GameX",
    sku: "GHS-EL-013",
    subtitle: "Gaming headphones with immersive sound and padded comfort",
    description:
      "Built for gamers, these headphones deliver immersive audio, comfortable padding, and a bold design suitable for gaming sessions, voice chat, and entertainment use.",
    shortDescription:
      "Gaming headset with immersive sound, soft ear padding, and stylish black finish.",
    rating: 4.6,
    reviews: 66,
    sold: 112,
    stock: 7,
    orders: "112 orders",
    priceTiers: [
      { price: 69, qty: "1-9 pcs" },
      { price: 64, qty: "10-29 pcs" },
      { price: 60, qty: "30+ pcs" },
    ],
    specificationRows: [
      { label: "Price:", value: "69" },
      { label: "Type:", value: "Gaming Headset" },
      { label: "Material:", value: "ABS + Memory Foam" },
      { label: "Design:", value: "Gaming" },
      { label: "Customization:", value: "No" },
      { label: "Protection:", value: "7-day return policy" },
      { label: "Warranty:", value: "6 months warranty" },
    ],
    detailSpecRows: [
      { label: "Model", value: "GX-HS-01" },
      { label: "Style", value: "Gaming Over-Ear" },
      { label: "Certificate", value: "CE" },
      { label: "Size", value: "Adjustable fit" },
      { label: "Mic", value: "Built-in mic" },
    ],
    features: [
      "Immersive gaming audio",
      "Comfortable long-session fit",
      "Built-in communication mic",
      "Stylish gaming design",
    ],
  }),

  createProduct({
    name: "Laptop",
    image: "/laptop.png",
    thumbnails: [
      "/laptop.png",
      "/laptop2.png",
      "/laptop3.png",
      "/laptop4.png",
      "/laptop5.png",
      "/laptop6.png",
    ],
    price: 699,
    oldPrice: 799,
    categoryName: "Computers",
    subCategory: "Laptops",
    brand: "NextCore",
    sku: "LTP-CM-014",
    subtitle: "Powerful laptop for office work, study, and daily productivity",
    description:
      "A sleek and reliable laptop suitable for office work, online learning, web browsing, presentations, and productivity tasks. It offers modern performance in a practical slim design.",
    shortDescription:
      "Reliable modern laptop for work, study, and everyday productivity tasks.",
    rating: 4.7,
    reviews: 74,
    sold: 95,
    stock: 3,
    orders: "95 orders",
    priceTiers: [
      { price: 699, qty: "1-4 pcs" },
      { price: 679, qty: "5-14 pcs" },
      { price: 649, qty: "15+ pcs" },
    ],
    specificationRows: [
      { label: "Price:", value: "699" },
      { label: "Type:", value: "Laptop" },
      { label: "Material:", value: "Aluminum + ABS" },
      { label: "Design:", value: "Slim Professional" },
      { label: "Customization:", value: "Bulk branding available" },
      { label: "Protection:", value: "7-day return policy" },
      { label: "Warranty:", value: "1 year warranty" },
    ],
    detailSpecRows: [
      { label: "Model", value: "NC-LP-14" },
      { label: "Style", value: "Professional Notebook" },
      { label: "Certificate", value: "CE / FCC" },
      { label: "Size", value: "15.6 inch" },
      { label: "Memory", value: "8GB RAM / 512GB SSD" },
    ],
    features: [
      "Slim and modern body",
      "Suitable for work and study",
      "Fast storage performance",
      "Reliable everyday computing",
    ],
  }),

  createProduct({
    name: "Smartphone",
    image: "/phone2.png",
    thumbnails: [
      "/phone2.png",
      "/phone2a.png",
      "/phone2b.png",
      "/phone2c.png",
      "/phone2d.png",
      "/phone2e.png",
    ],
    price: 399,
    oldPrice: 449,
    categoryName: "Mobiles",
    subCategory: "Smartphones",
    brand: "NovaMobile",
    sku: "PHN-MB-015",
    subtitle: "Modern smartphone with stylish body and smooth display",
    description:
      "This smartphone features a modern display, attractive body design, and practical performance for communication, browsing, apps, photos, and daily mobile use.",
    shortDescription:
      "Stylish everyday smartphone with modern display and reliable performance.",
    rating: 4.5,
    reviews: 81,
    sold: 133,
    stock: 5,
    orders: "133 orders",
    priceTiers: [
      { price: 399, qty: "1-4 pcs" },
      { price: 389, qty: "5-14 pcs" },
      { price: 375, qty: "15+ pcs" },
    ],
    specificationRows: [
      { label: "Price:", value: "399" },
      { label: "Type:", value: "Smartphone" },
      { label: "Material:", value: "Glass + Aluminum Frame" },
      { label: "Design:", value: "Slim Modern" },
      { label: "Customization:", value: "No" },
      { label: "Protection:", value: "7-day return policy" },
      { label: "Warranty:", value: "1 year warranty" },
    ],
    detailSpecRows: [
      { label: "Model", value: "NM-SP-10" },
      { label: "Style", value: "Touch Smartphone" },
      { label: "Certificate", value: "CE" },
      { label: "Size", value: "6.5 inch" },
      { label: "Memory", value: "8GB RAM / 128GB Storage" },
    ],
    features: [
      "Modern edge-to-edge display",
      "Smooth app performance",
      "Stylish mobile design",
      "Reliable daily smartphone use",
    ],
  }),

  createProduct({
    name: "Red Smartphone",
    image: "/red-phone1.png",
    thumbnails: [
      "/red-phone1.png",
      "/red-phone2.png",
      "/red-phone3.png",
      "/red-phone4.png",
      "/red-phone5.png",
      "/red-phone6.png",
    ],
    price: 429,
    oldPrice: 479,
    categoryName: "Mobiles",
    subCategory: "Smartphones",
    brand: "NovaMobile",
    sku: "PHN-MB-016",
    subtitle: "Premium red smartphone with stylish finish and strong appeal",
    description:
      "A premium-looking red smartphone made for users who want both style and performance. Suitable for calls, social apps, media, browsing, and daily mobile productivity.",
    shortDescription:
      "Premium red smartphone with elegant design and dependable daily performance.",
    rating: 4.6,
    reviews: 52,
    sold: 77,
    stock: 2,
    orders: "77 orders",
    priceTiers: [
      { price: 429, qty: "1-4 pcs" },
      { price: 415, qty: "5-14 pcs" },
      { price: 399, qty: "15+ pcs" },
    ],
    specificationRows: [
      { label: "Price:", value: "429" },
      { label: "Type:", value: "Smartphone" },
      { label: "Material:", value: "Glass + Metal Frame" },
      { label: "Design:", value: "Premium Finish" },
      { label: "Customization:", value: "No" },
      { label: "Protection:", value: "7-day return policy" },
      { label: "Warranty:", value: "1 year warranty" },
    ],
    detailSpecRows: [
      { label: "Model", value: "NM-RD-11" },
      { label: "Style", value: "Premium Smartphone" },
      { label: "Certificate", value: "CE" },
      { label: "Size", value: "6.7 inch" },
      { label: "Memory", value: "8GB RAM / 256GB Storage" },
    ],
    features: [
      "Premium red body finish",
      "Smooth performance for apps",
      "Elegant modern design",
      "Good for daily smartphone usage",
    ],
  }),
];

const categoryDefinitions = [
  {
    category_name: "Home & Living",
    description: "Furniture and home lifestyle products",
  },
  {
    category_name: "Kitchen & Dining",
    description: "Kitchen cookware and dining essentials",
  },
  {
    category_name: "Kitchen Appliances",
    description: "Modern appliances for kitchen use",
  },
  {
    category_name: "Office & Storage",
    description: "Office organization and storage products",
  },
  {
    category_name: "Home & Garden",
    description: "Home décor and garden-related products",
  },
  {
    category_name: "Electronics",
    description: "Electronic devices and accessories",
  },
  {
    category_name: "Computers",
    description: "Computer systems and accessories",
  },
  {
    category_name: "Mobiles",
    description: "Mobile phones and smartphone products",
  },
];

const seed = async () => {
  try {
    await connectDB();

    await Product.deleteMany({});
    await Category.deleteMany({});

    const insertedCategories = await Category.insertMany(categoryDefinitions);

    const categoryMap = insertedCategories.reduce((acc, category) => {
      acc[category.category_name] = category._id;
      return acc;
    }, {});

    const mappedProducts = rawProducts.map(({ categoryName, ...product }) => ({
      ...product,
      category: categoryMap[categoryName],
    }));

    const insertedProducts = await Product.insertMany(mappedProducts);

    for (let i = 0; i < insertedProducts.length; i++) {
      const current = insertedProducts[i];

      const sameCategory = insertedProducts
        .filter(
          (item) =>
            String(item._id) !== String(current._id) &&
            String(item.category) === String(current.category)
        )
        .slice(0, 6)
        .map((item) => item._id);

      const mixedSuggestions = insertedProducts
        .filter((item) => String(item._id) !== String(current._id))
        .slice(0, 5)
        .map((item) => item._id);

      await Product.findByIdAndUpdate(current._id, {
        relatedIds: sameCategory,
        youMayLikeIds: mixedSuggestions,
      });
    }

    console.log(`Seeded ${insertedCategories.length} categories successfully`);
    console.log(`Seeded ${insertedProducts.length} products successfully`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seed();
