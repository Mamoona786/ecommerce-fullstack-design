import api from "./api";

export const getAllProducts = async (filters = {}) => {
  const response = await api.get("/products", {
    params: filters,
  });

  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
