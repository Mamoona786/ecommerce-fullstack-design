import mongoose from "mongoose";

const priceTierSchema = new mongoose.Schema(
  {
    price: { type: String, required: true },
    qty: { type: String, required: true }
  },
  { _id: false }
);

const keyValueSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true }
  },
  { _id: false }
);

const sellerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    verified: { type: Boolean, default: true },
    shipping: { type: String, default: "Worldwide shipping" },
    logoLetter: { type: String, default: "R" }
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    thumbnails: [{ type: String }],
    price: { type: String, required: true },
    oldPrice: { type: String, default: "" },
    rating: { type: Number, default: 7.5 },
    orders: { type: String, default: "154 orders" },
    shipping: { type: String, default: "Free Shipping" },
    description: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    category: { type: String, default: "General" },
    subtitle: { type: String, default: "" },
    reviews: { type: Number, default: 32 },
    sold: { type: Number, default: 154 },
    stockStatus: { type: String, default: "In stock" },
    priceTiers: [priceTierSchema],
    specificationRows: [keyValueSchema],
    detailSpecRows: [keyValueSchema],
    features: [{ type: String }],
    seller: sellerSchema,
    relatedIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    youMayLikeIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
