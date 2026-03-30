import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);

export default router;
