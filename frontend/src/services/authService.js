import api from "../api/axios.js";

export const login = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};

export const register = async (name, email, password, role, storeName) => {
  const { data } = await api.post("/auth/register", {
    name,
    email,
    password,
    role,
    storeName,
  });
  return data;
};

export const getMe = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};
