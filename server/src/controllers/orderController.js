import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

const getStockStatus = (stock) => {
  if (stock <= 0) return "Out of stock";
  if (stock <= 5) return "Low stock";
  return "In stock";
};

const validateShippingAddress = (shippingAddress = {}) => {
  const { fullName, email, phone, address, city, postalCode, country } = shippingAddress;

  return (
    fullName?.trim() &&
    email?.trim() &&
    phone?.trim() &&
    address?.trim() &&
    city?.trim() &&
    postalCode?.trim() &&
    country?.trim()
  );
};

export const checkoutCart = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const { discount = 0, shippingAddress, paymentMethod = "cod" } = req.body;

    if (!validateShippingAddress(shippingAddress)) {
      return res.status(400).json({
        message: "Complete shipping information is required",
      });
    }

    if (!["cod", "card", "paypal"].includes(paymentMethod)) {
      return res.status(400).json({
        message: "Invalid payment method",
      });
    }

    await session.startTransaction();

    const cart = await Cart.findOne({ user: req.user._id }).session(session);

    if (!cart || !cart.items.length) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Cart is empty" });
    }

    for (const item of cart.items) {
      const product = await Product.findById(item.product).session(session);

      if (!product) {
        throw new Error(`${item.title || "Product"} not found`);
      }

      if (product.stock < item.quantity) {
        throw new Error(
          `${product.name} is out of stock or only ${product.stock} left`
        );
      }
    }

    for (const item of cart.items) {
      const product = await Product.findById(item.product).session(session);

      product.stock -= item.quantity;
      product.stockStatus = getStockStatus(product.stock);
      product.sold += item.quantity;

      await product.save({ session });
    }

    const subtotal = cart.items.reduce(
      (total, item) => total + Number(item.price || 0) * Number(item.quantity || 0),
      0
    );

    const parsedDiscount = Number(discount || 0);
    const tax = subtotal > 0 ? Math.round(subtotal * 0.05) : 0;
    const total = subtotal - parsedDiscount + tax;

    const isPaidMethod = paymentMethod === "card" || paymentMethod === "paypal";

    const order = await Order.create(
      [
        {
          user: req.user._id,
          items: cart.items.map((item) => ({
            product: item.product,
            title: item.title,
            image: item.image,
            price: Number(item.price || 0),
            quantity: item.quantity,
            seller: item.seller,
          })),
          shippingAddress: {
            fullName: shippingAddress.fullName.trim(),
            email: shippingAddress.email.trim().toLowerCase(),
            phone: shippingAddress.phone.trim(),
            address: shippingAddress.address.trim(),
            city: shippingAddress.city.trim(),
            postalCode: shippingAddress.postalCode.trim(),
            country: shippingAddress.country.trim(),
          },
          paymentInfo: {
            method: paymentMethod,
            status: isPaidMethod ? "paid" : "pending",
          },
          subtotal,
          discount: parsedDiscount,
          tax,
          total,
          status: isPaidMethod ? "paid" : "pending",
        },
      ],
      { session }
    );

    cart.items = [];
    cart.status = "active";
    await cart.save({ session });

    await session.commitTransaction();

    const createdOrder = await Order.findById(order[0]._id)
      .populate("items.product", "name image stock")
      .populate("user", "username email");

    res.status(201).json({
      message: "Order placed successfully",
      order: createdOrder,
    });
  } catch (error) {
    await session.abortTransaction();
    console.error("Checkout failed:", error.message);

    res.status(400).json({
      message: error.message || "Checkout failed",
    });
  } finally {
    session.endSession();
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.product", "name image stock")
      .populate("user", "username email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (String(order.user._id) !== String(req.user._id) && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to view this order" });
    }

    res.status(200).json({
      message: "Order fetched successfully",
      order,
    });
  } catch (error) {
    console.error("Failed to fetch order:", error.message);
    res.status(500).json({ message: error.message || "Failed to fetch order" });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product", "name image stock")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Failed to fetch orders:", error.message);
    res.status(500).json({ message: error.message || "Failed to fetch orders" });
  }
};
