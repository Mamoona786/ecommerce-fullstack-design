import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const getAdminStats = async (req, res) => {
  try {
    const [usersCount, productsCount, ordersCount] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
    ]);

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "username email")
      .select("-__v");

    const totalRevenueAgg = await Order.aggregate([
      {
        $match: {
          status: { $in: ["pending", "paid", "processing", "shipped", "delivered"] },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$total" },
        },
      },
    ]);

    const totalRevenue = totalRevenueAgg[0]?.totalRevenue || 0;

    res.status(200).json({
      usersCount,
      productsCount,
      ordersCount,
      totalRevenue,
      recentOrders,
    });
  } catch (error) {
    console.error("Failed to fetch admin stats:", error.message);
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
};

export const getAllUsersForAdmin = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password -__v")
      .sort({ createdAt: -1 });

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.error("Failed to fetch users:", error.message);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const getAllProductsForAdmin = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "category_name description")
      .sort({ createdAt: -1 })
      .select("-__v");

    res.status(200).json({
      products,
    });
  } catch (error) {
    console.error("Failed to fetch products for admin:", error.message);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const getAllOrdersForAdmin = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "username email role")
      .populate("items.product", "name image price stock")
      .sort({ createdAt: -1 })
      .select("-__v");

    res.status(200).json({
      orders,
    });
  } catch (error) {
    console.error("Failed to fetch orders for admin:", error.message);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const getAllCartsForAdmin = async (req, res) => {
  try {
    const carts = await Cart.find()
      .populate("user", "username email role")
      .populate("items.product", "name image price stock")
      .sort({ updatedAt: -1 })
      .select("-__v");

    res.status(200).json({
      carts,
    });
  } catch (error) {
    console.error("Failed to fetch carts for admin:", error.message);
    res.status(500).json({ message: "Failed to fetch carts" });
  }
};

export const createUserByAdmin = async (req, res) => {
  try {
    const { username, email, password, role = "user" } = req.body;

    if (!username?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ message: "Username, email and password are required" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    const allowedRoles = ["user", "admin"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role selected" });
    }

    const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists with this email" });
    }

    const user = await User.create({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password,
      role,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Failed to create user:", error.message);
    res.status(500).json({ message: "Failed to create user" });
  }
};
