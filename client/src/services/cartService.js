import api from "./api";

export const getMyCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};

export const addToCart = async ({ productId, quantity = 1, selectedTierPrice }) => {
  const response = await api.post("/cart", {
    productId,
    quantity,
    selectedTierPrice,
  });
  return response.data;
};

export const updateCartItemQty = async (productId, quantity) => {
  const response = await api.patch(`/cart/items/${productId}`, { quantity });
  return response.data;
};

export const removeCartItem = async (productId) => {
  const response = await api.delete(`/cart/items/${productId}`);
  return response.data;
};

export const clearCart = async () => {
  const response = await api.delete("/cart");
  return response.data;
};

export const mergeGuestCart = async (items = []) => {
  const response = await api.post("/cart/merge", { items });
  return response.data;
};

export const checkoutCart = async ({
  discount = 0,
  shippingAddress,
  paymentMethod,
}) => {
  const response = await api.post("/orders/checkout", {
    discount,
    shippingAddress,
    paymentMethod,
  });
  return response.data;
};

export const getOrderById = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};

export const getMyOrders = async () => {
  const response = await api.get("/orders/my-orders");
  return response.data;
};
