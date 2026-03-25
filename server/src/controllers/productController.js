import Product from "../models/Product.js";

const parseSortOption = (sort) => {
  switch (sort) {
    case "newest":
      return { createdAt: -1 };
    case "oldest":
      return { createdAt: 1 };
    case "title-asc":
      return { title: 1 };
    case "title-desc":
      return { title: -1 };
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
      filter.title = { $regex: search.trim(), $options: "i" };
    }

    if (category.trim() && category !== "All category") {
      filter.category = { $regex: `^${category.trim()}$`, $options: "i" };
    }

    const pageNumber = Number(page) || 1;
    const pageLimit = Number(limit) || 100;
    const skip = (pageNumber - 1) * pageLimit;

    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
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
      .populate("relatedIds")
      .populate("youMayLikeIds")
      .select("-__v");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};
