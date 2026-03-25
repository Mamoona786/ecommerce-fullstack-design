import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Product from "../models/Product.js";

const commonSeller = {
  name: "Guanjoi Trading LLC",
  location: "Germany, Berlin",
  verified: true,
  shipping: "Worldwide shipping",
  logoLetter: "R",
};

const commonSpecificationRows = [
  { label: "Price:", value: "Negotiable" },
  { label: "Type:", value: "Classic style" },
  { label: "Material:", value: "Premium quality" },
  { label: "Design:", value: "Modern nice" },
  { label: "Customization:", value: "Custom packaging available" },
  { label: "Protection:", value: "Refund Policy" },
  { label: "Warranty:", value: "2 years full warranty" },
];

const commonDetailSpecRows = [
  { label: "Model", value: "#8786867" },
  { label: "Style", value: "Classic style" },
  { label: "Certificate", value: "ISO-898921212" },
  { label: "Size", value: "34mm x 450mm x 19mm" },
  { label: "Memory", value: "36GB RAM" },
];

const commonFeatures = [
  "Premium build quality",
  "Modern and stylish design",
  "Reliable everyday use",
  "High customer satisfaction",
];

const createProduct = ({
  title,
  image,
  thumbnails,
  price,
  oldPrice = "",
  category,
  subtitle = "",
  description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  shortDescription = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  rating = 7.5,
  reviews = 32,
  sold = 154,
  stockStatus = "In stock",
  priceTiers = [
    { price: "$98.00", qty: "50-100 pcs" },
    { price: "$90.00", qty: "100-700 pcs" },
    { price: "$78.00", qty: "700+ pcs" },
  ],
}) => ({
  title,
  image,
  thumbnails,
  price,
  oldPrice,
  rating,
  orders: "154 orders",
  shipping: "Free Shipping",
  description,
  shortDescription,
  category,
  subtitle,
  reviews,
  sold,
  stockStatus,
  priceTiers,
  specificationRows: commonSpecificationRows,
  detailSpecRows: commonDetailSpecRows,
  features: commonFeatures,
  seller: commonSeller,
});

const sampleProducts = [
  // HOME AND OUTDOOR - exact section items
  createProduct({
    title: "Soft chairs",
    image: "/soft-chairs.png",
    thumbnails: ["/soft-chairs.png", "/soft-chairs2.png","/soft-chairs3.png","/soft-chairs4.png","/soft-chairs5.png","/soft-chairs6.png",],
    price: "$19.00",
    category: "Home",
    subtitle: "Comfortable soft chairs for home décor",
  }),
  createProduct({
    title: "Sofa & chair",
    image: "/sofa-and-chair.png",
    thumbnails: ["/sofa-and-chair.png","/sofa-and-chair2.png","/sofa-and-chair3.png","/sofa-and-chair4.png","/sofa-and-chair5.png","/sofa-and-chair6.png",],
    price: "$19.00",
    category: "Home",
    subtitle: "Stylish sofa and chair furniture set",
  }),
  createProduct({
    title: "Kitchen dishes",
    image: "/kitchen-dishes.png",
    thumbnails: [
      "/kitchen-dishes.png",
      "/kitchen-dishes2.png",
      "/kitchen-dishes3.png",
      "/kitchen-dishes4.png",
      "/kitchen-dishes5.png",
      "/kitchen-dishes6.png",
    ],
    price: "$19.00",
    category: "Home",
    subtitle: "Elegant kitchen dishware collection",
  }),
  createProduct({
    title: "Smart watches",
    image: "/smart-watches1.png",
    thumbnails: ["/smart-watches1.png","/smart-watches12.png","/smart-watches13.png","/smart-watches14.png","/smart-watches15.png","/smart-watches16.png",],
    price: "$19.00",
    category: "Home",
    subtitle: "Modern smart watches for daily wear",
  }),
  createProduct({
    title: "Kitchen mixer",
    image: "/kitchen-mixer.png",
    thumbnails: [
      "/kitchen-mixer.png",
      "/kitchen-mixer2.png",
      "/kitchen-mixer3.png",
      "/kitchen-mixer4.png",
      "/kitchen-mixer5.png",
      "/kitchen-mixer6.png",
    ],
    price: "$100.00",
    category: "Home",
    subtitle: "Powerful kitchen mixer for home use",
  }),
  createProduct({
    title: "Blenders",
    image: "/blender.png",
    thumbnails: [ "/blender.png","/blender2.png","/blender3.png","/blender4.png","/blender5.png","/blender6.png",],
    price: "$39.00",
    category: "Home",
    subtitle: "Smooth blending for everyday kitchen tasks",
  }),
  createProduct({
    title: "Home appliance",
    image: "/home-appliance.png",
    thumbnails: [
      "/home-appliance.png",
      "/home-appliance2.png",
      "/home-appliance3.png",
      "/home-appliance4.png",
      "/home-appliance5.png",
      "/home-appliance6.png",
    ],
    price: "$19.00",
    category: "Home",
    subtitle: "Useful appliances for modern living",
  }),
  createProduct({
    title: "Coffee maker",
    image: "/coffee-maker.png",
    thumbnails: [
      "/coffee-maker.png",
      "/coffee-maker2.png",
      "/coffee-maker3.png",
      "/coffee-maker4.png",
      "/coffee-maker5.png",
      "/coffee-maker6.png",
    ],
    price: "$10.00",
    category: "Home",
    subtitle: "Premium coffee maker for quick brewing",
  }),

  // CONSUMER ELECTRONICS AND GADGETS - exact section items
  createProduct({
    title: "Smart watches",
    image: "/watch.png",
    thumbnails: ["/watch.png", "/watch2.png", "/watch3.png", "/watch4.png", "watch5.png", "watch6.png", ],
    price: "$19.00",
    category: "Electronics",
    subtitle: "Feature-packed wearable smart watch",
  }),
  createProduct({
    title: "Cameras",
    image: "/camera.png",
    thumbnails: ["/camera.png","/camera2.png","/camera3.png","/camera4.png","/camera5.png", "/camera6.png"],
    price: "$89.00",
    category: "Electronics",
    subtitle: "High quality digital camera for sharp shots",
  }),
  createProduct({
    title: "Headphones",
    image: "/headphones.png",
    thumbnails: [
      "/headphones.png",
      "/headphones2.png",
      "/headphones3.png",
      "/headphones4.png",
      "/headphones5.png",
      "/headphones6.png",
    ],
    price: "$10.00",
    category: "Electronics",
    subtitle: "Comfortable headphones with rich sound",
  }),
  createProduct({
    title: "Smart watches",
    image: "/smart-watches1.png",
    thumbnails: ["/smart-watches1.png", "/smart-watches12.png", "/smart-watches13.png","/smart-watches14.png","/smart-watches15.png","/smart-watches16.png",],
    price: "$90.00",
    category: "Electronics",
    subtitle: "Premium edition smart watch series",
  }),
  createProduct({
    title: "Gaming set",
    image: "/headset.png",
    thumbnails: [
      "/headset.png",
      "/headset2.png",
      "/headset3.png",
      "/headset4.png",
      "/headset5.png",
      "/headset6.png",
    ],
    price: "$35.00",
    category: "Electronics",
    subtitle: "Gaming headset set with immersive audio",
  }),
  createProduct({
    title: "Laptops & PC",
    image: "/laptop.png",
    thumbnails: [
      "/laptop.png",
      "/laptop2.png",
      "/laptop3.png",
      "/laptop4.png",
      "/laptop5.png",
      "/laptop6.png",
    ],
    price: "$340.00",
    category: "Electronics",
    subtitle: "Powerful laptops and PC solutions",
  }),
  createProduct({
    title: "Smartphones",
    image: "/phone2.png",
    thumbnails: [
      "/phone2.png",
      "/phone2a.png",
      "/phone2b.png",
      "/phone2c.png",
      "/phone2d.png",
      "/phone2e.png",
    ],
    price: "$19.00",
    category: "Electronics",
    subtitle: "Latest smartphones with modern display",
  }),
  createProduct({
    title: "Electric kattle",
    image: "/electric-kattle.png",
    thumbnails: [
      "/electric-kattle.png",
      "/electric-kattle2.png",
      "/electric-kattle3.png",
      "/electric-kattle4.png",
      "/electric-kattle5.png",
      "/electric-kattle6.png",
    ],
    price: "$240.00",
    category: "Electronics",
    subtitle: "Fast heating electric kettle for daily use",
  }),
];

const seed = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});

    const inserted = await Product.insertMany(sampleProducts);

    // add related and you may like links
    for (let i = 0; i < inserted.length; i++) {
      const current = inserted[i];

      const sameCategory = inserted
        .filter(
          (item) =>
            String(item._id) !== String(current._id) &&
            item.category === current.category
        )
        .slice(0, 6)
        .map((item) => item._id);

      const mixedSuggestions = inserted
        .filter((item) => String(item._id) !== String(current._id))
        .slice(0, 5)
        .map((item) => item._id);

      await Product.findByIdAndUpdate(current._id, {
        relatedIds: sameCategory,
        youMayLikeIds: mixedSuggestions,
      });
    }

    console.log(`Seeded ${inserted.length} products successfully`);
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seed();
