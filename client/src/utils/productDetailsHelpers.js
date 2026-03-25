import { addToCart as addToCartApi } from "../services/cartService";

export const getUniqueProductImages = (product) => {
  if (!product) return [];

  const rawImages = [product.image, ...(product.thumbnails || [])].filter(Boolean);

  return [...new Set(rawImages)];
};

export const getSavedProducts = () => {
  try {
    return JSON.parse(localStorage.getItem("savedProducts")) || [];
  } catch (error) {
    return [];
  }
};

export const isProductSaved = (productId) => {
  const savedProducts = getSavedProducts();
  return savedProducts.some((item) => String(item.id) === String(productId));
};

export const toggleSavedProduct = (product) => {
  const savedProducts = getSavedProducts();
  const exists = savedProducts.some((item) => String(item.id) === String(product._id));

  let updatedProducts = [];

  if (exists) {
    updatedProducts = savedProducts.filter(
      (item) => String(item.id) !== String(product._id)
    );
  } else {
    updatedProducts = [
      ...savedProducts,
      {
        id: product._id,
        title: product.title,
        image: product.image,
        price: product.price,
      },
    ];
  }

  localStorage.setItem("savedProducts", JSON.stringify(updatedProducts));
  return !exists;
};

const getGuestCartItems = () => {
  try {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
  } catch {
    return [];
  }
};

const saveGuestCartItems = (items) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

const parsePrice = (price) => {
  if (typeof price === "number") return price;
  return Number(String(price || "").replace(/[^0-9.]/g, "")) || 0;
};

export const addProductToCart = async ({
  product,
  quantity = 1,
  selectedTierPrice = "",
}) => {
  const token = localStorage.getItem("token");

  if (token) {
    const response = await addToCartApi({
      productId: product._id,
      quantity,
      selectedTierPrice,
    });

    return response;
  }

  const cartItems = getGuestCartItems();

  const existingItem = cartItems.find(
    (item) => String(item.id) === String(product._id)
  );

  const itemPrice = parsePrice(selectedTierPrice || product.price);

  if (existingItem) {
    const updatedItems = cartItems.map((item) =>
      String(item.id) === String(product._id)
        ? {
            ...item,
            quantity: item.quantity + quantity,
            price: itemPrice,
          }
        : item
    );

    saveGuestCartItems(updatedItems);
    return updatedItems;
  }

  const newItem = {
    id: product._id,
    title: product.title,
    details: product.shortDescription || product.category || "",
    seller: product?.seller?.name || "Unknown seller",
    image: product.image,
    price: itemPrice,
    quantity,
  };

  const updatedItems = [...cartItems, newItem];
  saveGuestCartItems(updatedItems);
  return updatedItems;
};
