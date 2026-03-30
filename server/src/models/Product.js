import mongoose from "mongoose";

const priceTierSchema = new mongoose.Schema(
  {
    price: { type: Number, required: true },
    qty: { type: String, required: true },
  },
  { _id: false }
);

const keyValueSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const sellerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    verified: { type: Boolean, default: true },
    shipping: { type: String, default: "Worldwide shipping" },
    logoLetter: { type: String, default: "R" },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    price: { type: Number, required: true, min: 0 },

    // frontend bucket upload ke baad jo signed/public URL milega woh yahan save hoga
    image: { type: String, required: true, trim: true },

    description: { type: String, required: true, default: "" },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    stock: { type: Number, required: true, default: 0, min: 0 },

    oldPrice: { type: Number, default: 0 },
    thumbnails: [{ type: String }],
    shortDescription: { type: String, default: "" },
    subCategory: { type: String, default: "" },
    brand: { type: String, default: "" },
    sku: { type: String, default: "", unique: true, sparse: true },

    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    reviews: { type: Number, default: 0, min: 0 },
    sold: { type: Number, default: 0, min: 0 },

    stockStatus: {
      type: String,
      enum: ["In stock", "Low stock", "Out of stock"],
      default: "In stock",
    },

    orders: { type: String, default: "0 orders" },
    shipping: { type: String, default: "Free Shipping" },
    subtitle: { type: String, default: "" },

    priceTiers: [priceTierSchema],
    specificationRows: [keyValueSchema],
    detailSpecRows: [keyValueSchema],
    features: [{ type: String }],

    seller: sellerSchema,

    isActive: { type: Boolean, default: true },

    relatedIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    youMayLikeIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

productSchema.pre("save", function (next) {
  if (this.stock <= 0) {
    this.stockStatus = "Out of stock";
  } else if (this.stock <= 5) {
    this.stockStatus = "Low stock";
  } else {
    this.stockStatus = "In stock";
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
