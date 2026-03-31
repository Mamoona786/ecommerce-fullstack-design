import api from "./api";

export const getAdminStats = async () => {
  const response = await api.get("/admin/stats");
  return response.data;
};

export const getAdminUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

export const createAdminUser = async (userData) => {
  const response = await api.post("/admin/users", userData);
  return response.data;
};

export const getAdminProducts = async () => {
  const response = await api.get("/admin/products");
  return response.data;
};

export const getAdminOrders = async () => {
  const response = await api.get("/admin/orders");
  return response.data;
};

export const getAdminCarts = async () => {
  const response = await api.get("/admin/carts");
  return response.data;
};
