import api from "./api";

export const createOrGetMyChat = async () => {
  const response = await api.post("/chat/my");
  return response.data;
};

export const getMyChats = async () => {
  const response = await api.get("/chat/my");
  return response.data;
};

export const getMyChatById = async (chatId) => {
  const response = await api.get(`/chat/my/${chatId}`);
  return response.data;
};

export const sendMessageToChat = async (chatId, text) => {
  const response = await api.post(`/chat/my/${chatId}/messages`, { text });
  return response.data;
};

export const getAdminChats = async () => {
  const response = await api.get("/chat/admin/all");
  return response.data;
};

export const getAdminChatById = async (chatId) => {
  const response = await api.get(`/chat/admin/${chatId}`);
  return response.data;
};

export const replyAsAdmin = async (chatId, text) => {
  const response = await api.post(`/chat/admin/${chatId}/reply`, { text });
  return response.data;
};

export const updateChatStatus = async (chatId, payload) => {
  const response = await api.patch(`/chat/admin/${chatId}/status`, payload);
  return response.data;
};
