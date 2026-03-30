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
  const productId = product._id || product.id;

  const exists = savedProducts.some((item) => String(item.id) === String(productId));

  let updatedProducts = [];

  if (exists) {
    updatedProducts = savedProducts.filter(
      (item) => String(item.id) !== String(productId)
    );
  } else {
    updatedProducts = [
      ...savedProducts,
      {
        id: productId,
        title: product.name || product.title,
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
  const productId = product?._id || product?.id;

  if (!productId) {
    throw new Error("Product ID is missing");
  }

  if (token) {
    const response = await addToCartApi({
      productId,
      quantity,
      selectedTierPrice,
    });

    return response;
  }

  const cartItems = getGuestCartItems();

  const existingItem = cartItems.find(
    (item) => String(item.id) === String(productId)
  );

  const itemPrice = parsePrice(selectedTierPrice || product.price);

  if (existingItem) {
    const updatedItems = cartItems.map((item) =>
      String(item.id) === String(productId)
        ? {
            ...item,
            quantity: item.quantity + quantity,
            price: itemPrice,
            stock: Number(product?.stock || 0),
          }
        : item
    );

    saveGuestCartItems(updatedItems);
    return updatedItems;
  }

  const newItem = {
    id: productId,
    product: productId,
    title: product.name || product.title,
    name: product.name || product.title,
    details:
      product.shortDescription ||
      product?.category?.category_name ||
      product.category ||
      "",
    seller: product?.seller?.name || "Unknown seller",
    image: product.image,
    price: itemPrice,
    quantity,
    stock: Number(product?.stock || 0),
  };

  const updatedItems = [...cartItems, newItem];
  saveGuestCartItems(updatedItems);
  return updatedItems;
};
