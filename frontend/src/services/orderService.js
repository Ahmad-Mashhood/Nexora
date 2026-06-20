import api from "../api/axios.js";

export const placeOrder = async (orderData) => {
  const { data } = await api.post("/orders", orderData);
  return data;
};

export const getMyOrders = async () => {
  const { data } = await api.get("/orders/myorders");
  return data;
};

export const getSellerOrders = async () => {
  const { data } = await api.get("/orders/seller");
  return data;
};

export const updateSellerOrderStatus = async (id, status) => {
  const { data } = await api.put(`/orders/${id}/seller-status`, { status });
  return data;
};

export const getAllOrders = async () => {
  const { data } = await api.get("/orders");
  return data;
};

export const updateOrderStatus = async (id, status) => {
  const { data } = await api.put(`/orders/${id}/status`, { status });
  return data;
};
