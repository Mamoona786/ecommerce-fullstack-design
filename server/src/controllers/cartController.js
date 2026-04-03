import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const parsePrice = (price) => {
  if (typeof price === "number") return price;
  return Number(String(price || "").replace(/[^0-9.]/g, "")) || 0;
};

const populateCart = async (cartId) => {
  return Cart.findById(cartId).populate({
    path: "items.product",
    select: "name image price stock stockStatus seller",
  });
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
    const populatedCart = await populateCart(cart._id);

    res.status(200).json({
      message: "Cart fetched successfully",
      cart: populatedCart,
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
    const populatedCart = await populateCart(cart._id);

    res.status(200).json({
      message: "Product added to cart",
      cart: populatedCart,
    });
  } catch (error) {
    console.error("Failed to add to cart:", error.message);
    res.status(500).json({ message: error.message || "Failed to add to cart" });
  }
};

export const mergeGuestCart = async (req, res) => {
  try {
    const incomingItems = Array.isArray(req.body.items) ? req.body.items : [];
    const cart = await getOrCreateCart(req.user._id);

    for (const incomingItem of incomingItems) {
      const productId = incomingItem.product || incomingItem.id;
      const qty = Number(incomingItem.quantity || 0);
      const selectedPrice = parsePrice(incomingItem.price);

      if (!productId || qty < 1) {
        continue;
      }

      const product = await Product.findById(productId);

      if (!product || product.stock <= 0) {
        continue;
      }

      const existingItemIndex = cart.items.findIndex(
        (item) => String(item.product) === String(product._id)
      );

      if (existingItemIndex > -1) {
        const mergedQty = cart.items[existingItemIndex].quantity + qty;
        cart.items[existingItemIndex].quantity = Math.min(mergedQty, product.stock);
        cart.items[existingItemIndex].price = selectedPrice || parsePrice(product.price);
        cart.items[existingItemIndex].title = product.name || "Product";
        cart.items[existingItemIndex].image = product.image || "";
        cart.items[existingItemIndex].seller = product?.seller?.name || "";
      } else {
        cart.items.push({
          product: product._id,
          title: product.name || "Product",
          image: product.image || "",
          price: selectedPrice || parsePrice(product.price),
          quantity: Math.min(qty, product.stock),
          seller: product?.seller?.name || "",
        });
      }
    }

    await cart.save();
    const populatedCart = await populateCart(cart._id);

    res.status(200).json({
      message: "Guest cart merged successfully",
      cart: populatedCart,
    });
  } catch (error) {
    console.error("Failed to merge guest cart:", error.message);
    res.status(500).json({ message: error.message || "Failed to merge guest cart" });
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
    const populatedCart = await populateCart(cart._id);

    res.status(200).json({
      message: "Cart item updated",
      cart: populatedCart,
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
    const populatedCart = await populateCart(cart._id);

    res.status(200).json({
      message: "Cart item removed",
      cart: populatedCart,
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
    const populatedCart = await populateCart(cart._id);

    res.status(200).json({
      message: "Cart cleared",
      cart: populatedCart,
    });
  } catch (error) {
    console.error("Failed to clear cart:", error.message);
    res.status(500).json({ message: error.message || "Failed to clear cart" });
  }
};
