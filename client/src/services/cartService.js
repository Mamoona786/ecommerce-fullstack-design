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

export const checkoutCart = async (discount = 0) => {
  const response = await api.post("/orders/checkout", { discount });
  return response.data;
};
