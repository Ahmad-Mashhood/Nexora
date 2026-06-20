import api from "../api/axios.js";

export const fetchProducts = async () => {
  const { data } = await api.get("/products");
  return data;
};

export const fetchMyProducts = async () => {
  const { data } = await api.get("/products/mine");
  return data;
};

export const fetchProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const createProduct = async (product) => {
  const { data } = await api.post("/products", product);
  return data;
};

export const updateProduct = async (id, product) => {
  const { data } = await api.put(`/products/${id}`, product);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};
