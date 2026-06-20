import { useEffect, useState } from "react";
import Loader from "../../components/ui/Loader.jsx";
import Message from "../../components/ui/Message.jsx";
import { getSellerOrders, updateSellerOrderStatus } from "../../services/orderService.js";

const SellerOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = async () => {
    try {
      const data = await getSellerOrders();
      setOrders(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateSellerOrderStatus(id, status);
      await loadOrders();
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <Loader label="Loading sales" />;

  return (
    <div className="container page admin-page">
      <header className="page-header animate-fade-in">
        <div className="page-header__content">
          <span className="page-header__badge">Seller</span>
          <h1 className="page-header__title">Sales orders</h1>
          <p className="page-header__subtitle">Fulfill orders from your store</p>
        </div>
      </header>
      <Message>{error}</Message>
      {orders.length === 0 ? (
        <p className="empty-state">No sales yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-card__header">
                <span>
                  Buyer: {order.buyer?.name} ({order.buyer?.email})
                </span>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  <option value="pending">pending</option>
                  <option value="shipped">shipped</option>
                  <option value="delivered">delivered</option>
                </select>
              </div>
              <p>
                {new Date(order.createdAt).toLocaleDateString()} — Your total: $
                {order.myTotal.toFixed(2)}
                {order.isPaid ? " (paid)" : " (payment pending)"}
              </p>
              <ul>
                {order.myItems.map((item) => (
                  <li key={item.product}>
                    {item.title} x {item.quantity} — ${(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerOrdersPage;
