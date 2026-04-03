import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  checkoutCart,
  getMyOrders,
  getOrderById,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/checkout", protect, checkoutCart);
router.get("/my-orders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);

export default router;
