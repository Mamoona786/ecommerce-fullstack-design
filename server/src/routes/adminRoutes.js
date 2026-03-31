import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
import {
  getAdminStats,
  getAllOrdersForAdmin,
  getAllProductsForAdmin,
  getAllUsersForAdmin,
  getAllCartsForAdmin,
  createUserByAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/stats", getAdminStats);
router.get("/users", getAllUsersForAdmin);
router.post("/users", createUserByAdmin);
router.get("/products", getAllProductsForAdmin);
router.get("/orders", getAllOrdersForAdmin);
router.get("/carts", getAllCartsForAdmin);

export default router;
