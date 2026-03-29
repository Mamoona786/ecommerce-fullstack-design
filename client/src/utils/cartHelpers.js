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

export const addCartItem = ({ product, quantity = 1, selectedTierPrice }) => {
  const items = getCartItems();

  const productId = product?._id || product?.id;
  if (!productId) return items;

  const existingIndex = items.findIndex(
    (item) => String(item.id) === String(productId)
  );

  const stock = Number(product?.stock || 0);
  const qty = Number(quantity || 1);
  const price = Number(selectedTierPrice || product?.price || 0);

  if (existingIndex > -1) {
    items[existingIndex] = {
      ...items[existingIndex],
      quantity: items[existingIndex].quantity + qty,
      price,
      stock,
    };
  } else {
    items.push({
      id: productId,
      name: product?.name || product?.title || "",
      image: product?.image || "",
      price,
      quantity: qty,
      stock,
      seller: product?.seller?.name || "",
    });
  }

  saveCartItems(items);
  return items;
};

export const updateCartItemQty = (id, quantity) => {
  const items = getCartItems();

  const updated = items.map((item) =>
    String(item.id) === String(id) ? { ...item, quantity: Number(quantity) } : item
  );

  saveCartItems(updated);
  return updated;
};

export const removeCartItem = (id) => {
  const items = getCartItems();
  const updated = items.filter((item) => String(item.id) !== String(id));

  saveCartItems(updated);
  return updated;
};

export const clearCart = () => {
  localStorage.removeItem("cartItems");
  return [];
};
