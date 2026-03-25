export const getCartItems = () => {
  try {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
  } catch {
    return [];
  }
};

export const saveCartItems = (items) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

export const updateCartItemQty = (id, quantity) => {
  const items = getCartItems();

  const updated = items.map((item) =>
    item.id === id ? { ...item, quantity } : item
  );

  saveCartItems(updated);
  return updated;
};

export const removeCartItem = (id) => {
  const items = getCartItems();
  const updated = items.filter((item) => item.id !== id);

  saveCartItems(updated);
  return updated;
};

export const clearCart = () => {
  localStorage.removeItem("cartItems");
  return [];
};
