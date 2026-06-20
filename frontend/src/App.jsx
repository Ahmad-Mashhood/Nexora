import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import BuyerRoute from "./components/auth/BuyerRoute.jsx";
import AdminRoute from "./components/auth/AdminRoute.jsx";
import SellerRoute from "./components/auth/SellerRoute.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import PaymentsPage from "./pages/PaymentsPage.jsx";
import AdminProductsPage from "./pages/admin/AdminProductsPage.jsx";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage.jsx";
import SellerProductsPage from "./pages/seller/SellerProductsPage.jsx";
import SellerOrdersPage from "./pages/seller/SellerOrdersPage.jsx";
import SellerPaymentsPage from "./pages/seller/SellerPaymentsPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route
          path="cart"
          element={
            <BuyerRoute>
              <CartPage />
            </BuyerRoute>
          }
        />
        <Route
          path="checkout"
          element={
            <BuyerRoute>
              <CheckoutPage />
            </BuyerRoute>
          }
        />
        <Route
          path="orders"
          element={
            <BuyerRoute>
              <OrdersPage />
            </BuyerRoute>
          }
        />
        <Route
          path="payments"
          element={
            <BuyerRoute>
              <PaymentsPage />
            </BuyerRoute>
          }
        />
        <Route
          path="admin/products"
          element={
            <AdminRoute>
              <AdminProductsPage />
            </AdminRoute>
          }
        />
        <Route
          path="admin/orders"
          element={
            <AdminRoute>
              <AdminOrdersPage />
            </AdminRoute>
          }
        />
        <Route
          path="seller/products"
          element={
            <SellerRoute>
              <SellerProductsPage />
            </SellerRoute>
          }
        />
        <Route
          path="seller/orders"
          element={
            <SellerRoute>
              <SellerOrdersPage />
            </SellerRoute>
          }
        />
        <Route
          path="seller/payments"
          element={
            <SellerRoute>
              <SellerPaymentsPage />
            </SellerRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
