import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const parsePrice = (price) => {
  if (typeof price === "number") return price;
  return Number(String(price || "").replace(/[^0-9.]/g, "")) || 0;
};

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      status: "active",
      items: [],
    });
  }

  return cart;
};

export const getMyCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user._id);

    res.status(200).json({
      message: "Cart fetched successfully",
      cart,
    });
  } catch (error) {
    console.error("Failed to fetch cart:", error.message);
    res.status(500).json({ message: error.message || "Failed to fetch cart" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, selectedTierPrice } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const qty = Number(quantity);
    if (!qty || qty < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const product = await Product.findById(productId).populate("category");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.stock < qty) {
      return res.status(400).json({
        message: `Only ${product.stock} item(s) available in stock`,
      });
    }

    const cart = await getOrCreateCart(req.user._id);

    const itemPrice = parsePrice(selectedTierPrice || product.price);

    const existingItemIndex = cart.items.findIndex(
      (item) => String(item.product) === String(product._id)
    );

    if (existingItemIndex > -1) {
      const newQty = cart.items[existingItemIndex].quantity + qty;

      if (newQty > product.stock) {
        return res.status(400).json({
          message: `Cannot add more than available stock (${product.stock})`,
        });
      }

      cart.items[existingItemIndex].quantity = newQty;
      cart.items[existingItemIndex].price = itemPrice;
      cart.items[existingItemIndex].title = product.name || "Product";
      cart.items[existingItemIndex].image = product.image || "";
      cart.items[existingItemIndex].seller = product?.seller?.name || "";
    } else {
      cart.items.push({
        product: product._id,
        title: product.name || "Product",
        image: product.image || "",
        price: itemPrice,
        quantity: qty,
        seller: product?.seller?.name || "",
      });
    }

    await cart.save();

    res.status(200).json({
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    console.error("Failed to add to cart:", error.message);
    res.status(500).json({ message: error.message || "Failed to add to cart" });
  }
};

export const updateCartItemQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const qty = Number(quantity);
    if (!qty || qty < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cart = await getOrCreateCart(req.user._id);

    const item = cart.items.find(
      (cartItem) => String(cartItem.product) === String(productId)
    );

    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (qty > product.stock) {
      return res.status(400).json({
        message: `Only ${product.stock} item(s) available in stock`,
      });
    }

    item.quantity = qty;
    item.price = parsePrice(item.price || product.price);

    await cart.save();

    res.status(200).json({
      message: "Cart item updated",
      cart,
    });
  } catch (error) {
    console.error("Failed to update cart item:", error.message);
    res.status(500).json({ message: error.message || "Failed to update cart item" });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await getOrCreateCart(req.user._id);

    cart.items = cart.items.filter(
      (item) => String(item.product) !== String(productId)
    );

    await cart.save();

    res.status(200).json({
      message: "Cart item removed",
      cart,
    });
  } catch (error) {
    console.error("Failed to remove cart item:", error.message);
    res.status(500).json({ message: error.message || "Failed to remove cart item" });
  }
};

export const clearMyCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user._id);
    cart.items = [];
    await cart.save();

    res.status(200).json({
      message: "Cart cleared",
      cart,
    });
  } catch (error) {
    console.error("Failed to clear cart:", error.message);
    res.status(500).json({ message: error.message || "Failed to clear cart" });
  }
};
