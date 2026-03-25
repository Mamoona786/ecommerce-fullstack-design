import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { checkoutCart } from "../controllers/orderController.js";

const router = express.Router();

router.post("/checkout", protect, checkoutCart);

export default router;
