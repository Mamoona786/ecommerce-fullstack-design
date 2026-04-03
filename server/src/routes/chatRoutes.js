import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createOrGetMyChat,
  getMyChats,
  getMyChatById,
  sendMessageToChat,
  getAllChatsForAdmin,
  getAdminChatById,
  replyAsAdmin,
  updateChatStatus,
} from "../controllers/chatController.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/my", protect, getMyChats);
router.post("/my", protect, createOrGetMyChat);
router.get("/my/:chatId", protect, getMyChatById);
router.post("/my/:chatId/messages", protect, sendMessageToChat);

router.get("/admin/all", protect, adminOnly, getAllChatsForAdmin);
router.get("/admin/:chatId", protect, adminOnly, getAdminChatById);
router.post("/admin/:chatId/reply", protect, adminOnly, replyAsAdmin);
router.patch("/admin/:chatId/status", protect, adminOnly, updateChatStatus);

export default router;
