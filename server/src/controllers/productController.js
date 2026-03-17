import Product from "../models/product.js";

// GET all products
export const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;

    let filter = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// GET single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

// POST create product
export const createProduct = async (req, res) => {
  try {
    const { name, price, image, description, category, stock } = req.body;

    const product = await Product.create({
      name,
      price,
      image,
      description,
      category,
      stock,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to create product" });
  }
};

// PUT update product
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product" });
  }
};

// DELETE product
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};
