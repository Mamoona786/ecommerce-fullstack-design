import Category from "../models/Category.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .sort({ createdAt: -1 })
      .select("-__v");

    res.status(200).json({
      categories,
    });
  } catch (error) {
    console.error("Failed to fetch categories:", error.message);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).select("-__v");

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error("Failed to fetch category:", error.message);
    res.status(500).json({ message: "Failed to fetch category" });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { category_name, description } = req.body;

    if (!category_name?.trim()) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const existingCategory = await Category.findOne({
      category_name: { $regex: `^${category_name.trim()}$`, $options: "i" },
    });

    if (existingCategory) {
      return res.status(409).json({ message: "Category already exists" });
    }

    const category = await Category.create({
      category_name: category_name.trim(),
      description: description?.trim() || "",
    });

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error("Failed to create category:", error.message);
    res.status(500).json({ message: "Failed to create category" });
  }
};
