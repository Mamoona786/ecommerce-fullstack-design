import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

const getStockStatus = (stock) => {
  if (stock <= 0) return "Out of stock";
  if (stock <= 5) return "Low stock";
  return "In stock";
};

export const checkoutCart = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const { discount = 0 } = req.body;

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

    const tax = subtotal > 0 ? Math.round(subtotal * 0.05) : 0;
    const total = subtotal - Number(discount || 0) + tax;

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
          subtotal,
          discount: Number(discount || 0),
          tax,
          total,
          status: "pending",
        },
      ],
      { session }
    );

    cart.items = [];
    cart.status = "active";
    await cart.save({ session });

    await session.commitTransaction();

    res.status(201).json({
      message: "Order placed successfully",
      order: order[0],
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
