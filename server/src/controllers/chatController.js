import Chat from "../models/Chat.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import { generateSupportReply } from "../services/openaiService.js";
import { buildOrderSummary, buildUserSummary } from "../utils/chatPromptBuilder.js";

export const createOrGetMyChat = async (req, res) => {
  try {
    let chat = await Chat.findOne({ user: req.user._id, status: { $ne: "resolved" } })
      .sort({ updatedAt: -1 });

    if (!chat) {
      chat = await Chat.create({
        user: req.user._id,
        title: "Support Chat",
        messages: [
          {
            sender: "assistant",
            text: "Hello! How can I help you with your order, cart, payment, or account today?",
          },
        ],
        lastMessageAt: new Date(),
      });
    }

    res.status(200).json({ chat });
  } catch (error) {
    console.error("createOrGetMyChat error:", error.message);
    res.status(500).json({ message: "Failed to create or get chat" });
  }
};

export const getMyChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user._id })
      .sort({ lastMessageAt: -1 });

    res.status(200).json({ chats });
  } catch (error) {
    console.error("getMyChats error:", error.message);
    res.status(500).json({ message: "Failed to fetch chats" });
  }
};

export const getMyChatById = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.chatId,
      user: req.user._id,
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json({ chat });
  } catch (error) {
    console.error("getMyChatById error:", error.message);
    res.status(500).json({ message: "Failed to fetch chat" });
  }
};

export const sendMessageToChat = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({ message: "Message text is required" });
    }

    const chat = await Chat.findOne({
      _id: req.params.chatId,
      user: req.user._id,
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    chat.messages.push({
      sender: "user",
      text: text.trim(),
      createdAt: new Date(),
    });

    chat.lastMessageAt = new Date();
    await chat.save();

    let assistantReply = "Thanks for your message. A support reply is not available right now.";

    if (chat.aiEnabled) {
      const user = await User.findById(req.user._id).select("_id username email role");
      const orders = await Order.find({ user: req.user._id })
        .sort({ createdAt: -1 })
        .limit(5);

      assistantReply = await generateSupportReply({
        userMessage: text.trim(),
        recentMessages: chat.messages.slice(-8).map((m) => ({
          sender: m.sender,
          text: m.text,
        })),
        orderSummary: buildOrderSummary(orders),
        userSummary: buildUserSummary(user),
      });
    }

    chat.messages.push({
      sender: "assistant",
      text: assistantReply,
      createdAt: new Date(),
    });

    chat.lastMessageAt = new Date();
    await chat.save();

    res.status(200).json({
      message: "Reply generated successfully",
      chat,
      reply: assistantReply,
    });
  } catch (error) {
    console.error("sendMessageToChat error:", error.message);
    res.status(500).json({ message: "Failed to send message" });
  }
};

export const getAllChatsForAdmin = async (req, res) => {
  try {
    const chats = await Chat.find()
      .populate("user", "username email")
      .populate("assignedAdmin", "username email")
      .sort({ lastMessageAt: -1 });

    res.status(200).json({ chats });
  } catch (error) {
    console.error("getAllChatsForAdmin error:", error.message);
    res.status(500).json({ message: "Failed to fetch admin chats" });
  }
};

export const getAdminChatById = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId)
      .populate("user", "username email")
      .populate("assignedAdmin", "username email");

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json({ chat });
  } catch (error) {
    console.error("getAdminChatById error:", error.message);
    res.status(500).json({ message: "Failed to fetch admin chat" });
  }
};

export const replyAsAdmin = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({ message: "Reply text is required" });
    }

    const chat = await Chat.findById(req.params.chatId);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    chat.messages.push({
      sender: "admin",
      text: text.trim(),
      createdAt: new Date(),
    });

    chat.assignedAdmin = req.user._id;
    chat.status = "waiting_admin";
    chat.lastMessageAt = new Date();

    await chat.save();

    res.status(200).json({ message: "Admin reply sent", chat });
  } catch (error) {
    console.error("replyAsAdmin error:", error.message);
    res.status(500).json({ message: "Failed to send admin reply" });
  }
};

export const updateChatStatus = async (req, res) => {
  try {
    const { status, aiEnabled } = req.body;

    const chat = await Chat.findById(req.params.chatId);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    if (status) {
      chat.status = status;
    }

    if (typeof aiEnabled === "boolean") {
      chat.aiEnabled = aiEnabled;
    }

    await chat.save();

    res.status(200).json({ message: "Chat updated", chat });
  } catch (error) {
    console.error("updateChatStatus error:", error.message);
    res.status(500).json({ message: "Failed to update chat" });
  }
};
