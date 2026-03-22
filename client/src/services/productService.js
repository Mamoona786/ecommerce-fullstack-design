import api from "./api";
import {
  getCatalogProductById,
  getCatalogProducts,
} from "../data/productCatalog";

const normalizeApiProduct = (raw) => {
  if (!raw) return null;

  const fallback = getCatalogProductById(raw.id);

  return {
    ...(fallback || {}),
    ...raw,
    image: raw.image || fallback?.image || "",
    thumbnails: raw.thumbnails || fallback?.thumbnails || [],
    priceTiers: raw.priceTiers || fallback?.priceTiers || [],
    specificationRows: raw.specificationRows || fallback?.specificationRows || [],
    detailSpecRows: raw.detailSpecRows || fallback?.detailSpecRows || [],
    features: raw.features || fallback?.features || [],
    seller: raw.seller || fallback?.seller || {},
    relatedIds: raw.relatedIds || fallback?.relatedIds || [],
    youMayLikeIds: raw.youMayLikeIds || fallback?.youMayLikeIds || [],
    reviews: raw.reviews ?? fallback?.reviews ?? 32,
    sold: raw.sold ?? fallback?.sold ?? 154,
    stockStatus: raw.stockStatus || fallback?.stockStatus || "In stock",
  };
};

export const getAllProducts = async () => {
  try {
    const response = await api.get("/products");
    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data.map(normalizeApiProduct);
    }
    return getCatalogProducts();
  } catch {
    return getCatalogProducts();
  }
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return normalizeApiProduct(response.data);
};

export const getResolvedProductById = async (id) => {
  try {
    return await getProductById(id);
  } catch {
    const localProduct = getCatalogProductById(id);
    if (!localProduct) {
      throw new Error("Product not found");
    }
    return localProduct;
  }
};
