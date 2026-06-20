import { createContext, useContext, useState, useEffect } from "react";
import { login as loginApi, register as registerApi } from "../services/authService.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    const stored = localStorage.getItem("userInfo");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    } else {
      localStorage.removeItem("userInfo");
    }
  }, [userInfo]);

  const login = async (email, password) => {
    const data = await loginApi(email, password);
    setUserInfo(data);
    return data;
  };

  const register = async (name, email, password, role = "buyer", storeName = "") => {
    const data = await registerApi(name, email, password, role, storeName);
    setUserInfo(data);
    return data;
  };

  const logout = () => setUserInfo(null);

  const isBuyer = userInfo?.role === "buyer" || userInfo?.role === "user";
  const isSeller = userInfo?.role === "seller";
  const isAdmin = userInfo?.role === "admin";

  return (
    <AuthContext.Provider
      value={{ userInfo, login, register, logout, isBuyer, isSeller, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
