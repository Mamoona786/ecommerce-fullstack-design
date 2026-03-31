import Product from "../models/Product.js";
import Category from "../models/Category.js";

const parseSortOption = (sort) => {
  switch (sort) {
    case "newest":
      return { createdAt: -1 };
    case "oldest":
      return { createdAt: 1 };
    case "name-asc":
    case "title-asc":
      return { name: 1 };
    case "name-desc":
    case "title-desc":
      return { name: -1 };
    case "price-asc":
      return { price: 1 };
    case "price-desc":
      return { price: -1 };
    default:
      return { createdAt: -1 };
  }
};

export const getProducts = async (req, res) => {
  try {
    const {
      search = "",
      category = "",
      sort = "newest",
      page = 1,
      limit = 100,
      seller = "",
    } = req.query;

    const filter = {};

    if (search.trim()) {
      filter.name = { $regex: search.trim(), $options: "i" };
    }

    if (seller.trim()) {
      filter["seller.name"] = { $regex: seller.trim(), $options: "i" };
    }

    if (category.trim() && category !== "All category") {
      const matchedCategory = await Category.findOne({
        category_name: { $regex: `^${category.trim()}$`, $options: "i" },
      });

      if (!matchedCategory) {
        return res.status(200).json({
          products: [],
          total: 0,
          page: Number(page) || 1,
          limit: Number(limit) || 100,
          totalPages: 0,
        });
      }

      filter.category = matchedCategory._id;
    }

    const pageNumber = Number(page) || 1;
    const pageLimit = Number(limit) || 100;
    const skip = (pageNumber - 1) * pageLimit;

    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .populate("category", "category_name description")
      .sort(parseSortOption(sort))
      .skip(skip)
      .limit(pageLimit)
      .select("-__v");

    res.status(200).json({
      products,
      total,
      page: pageNumber,
      limit: pageLimit,
      totalPages: Math.ceil(total / pageLimit),
    });
  } catch (error) {
    console.error("Failed to fetch products:", error.message);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "category_name description")
      .populate("relatedIds")
      .populate("youMayLikeIds")
      .select("-__v");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Failed to fetch product:", error.message);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      image,
      description,
      category,
      stock,
      brand,
      shortDescription,
      subCategory,
    } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({ message: "Product name is required" });
    }

    if (!image?.trim()) {
      return res.status(400).json({ message: "Product image is required" });
    }

    if (!description?.trim()) {
      return res.status(400).json({ message: "Product description is required" });
    }

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    if (Number(price) < 0) {
      return res.status(400).json({ message: "Price cannot be negative" });
    }

    if (Number(stock) < 0) {
      return res.status(400).json({ message: "Stock cannot be negative" });
    }

    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(404).json({ message: "Selected category not found" });
    }

    const product = await Product.create({
      name: name.trim(),
      price: Number(price || 0),
      image: image.trim(),
      description: description.trim(),
      category,
      stock: Number(stock || 0),
      brand: brand?.trim() || "",
      shortDescription: shortDescription?.trim() || "",
      subCategory: subCategory?.trim() || "",
      seller: {
        name: "Admin Store",
        location: "Pakistan",
        verified: true,
        shipping: "Worldwide shipping",
        logoLetter: "A",
      },
    });

    const populatedProduct = await Product.findById(product._id).populate(
      "category",
      "category_name description"
    );

    res.status(201).json({
      message: "Product created successfully",
      product: populatedProduct,
    });
  } catch (error) {
    console.error("Failed to create product:", error.message);
    res.status(500).json({ message: "Failed to create product" });
  }
};
