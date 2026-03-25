import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

export const checkoutCart = async (req, res) => {
  try {
    const { discount = 0 } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart || !cart.items.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const subtotal = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const tax = subtotal > 0 ? Math.round(subtotal * 0.05) : 0;
    const total = subtotal - Number(discount || 0) + tax;

    const order = await Order.create({
      user: req.user._id,
      items: cart.items.map((item) => ({
        product: item.product,
        title: item.title,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        seller: item.seller,
      })),
      subtotal,
      discount: Number(discount || 0),
      tax,
      total,
      status: "pending",
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Checkout failed:", error.message);
    res.status(500).json({ message: "Checkout failed" });
  }
};
