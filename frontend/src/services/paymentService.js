import api from "../api/axios.js";

export const getMyPayments = async () => {
  const { data } = await api.get("/payments/my");
  return data;
};

export const getSellerPayments = async () => {
  const { data } = await api.get("/payments/seller");
  return data;
};

export const payPayment = async (id, cardNumber) => {
  const { data } = await api.put(`/payments/${id}/pay`, { cardNumber });
  return data;
};
