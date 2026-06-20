import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const isBuyer = (user) => user?.role === "buyer" || user?.role === "user";

const BuyerRoute = ({ children }) => {
  const { userInfo } = useAuth();
  if (!userInfo) return <Navigate to="/login" replace />;
  if (!isBuyer(userInfo)) return <Navigate to="/" replace />;
  return children;
};

export default BuyerRoute;
