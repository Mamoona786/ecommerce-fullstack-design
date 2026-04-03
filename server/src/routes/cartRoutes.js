import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addToCart,
  clearMyCart,
  getMyCart,
  mergeGuestCart,
  removeCartItem,
  updateCartItemQuantity,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", protect, getMyCart);
router.post("/", protect, addToCart);
router.post("/merge", protect, mergeGuestCart);
router.patch("/items/:productId", protect, updateCartItemQuantity);
router.delete("/items/:productId", protect, removeCartItem);
router.delete("/", protect, clearMyCart);

export default router;
