import { useEffect, useState } from "react";
import Loader from "../../components/ui/Loader.jsx";
import Message from "../../components/ui/Message.jsx";
import { getAllOrders, updateOrderStatus } from "../../services/orderService.js";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = async () => {
    try {
      const data = await getAllOrders();
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
      await updateOrderStatus(id, status);
      await loadOrders();
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <Loader label="Loading orders" />;

  return (
    <div className="container page admin-page">
      <header className="page-header animate-fade-in">
        <div className="page-header__content">
          <span className="page-header__badge">Admin</span>
          <h1 className="page-header__title">All orders</h1>
          <p className="page-header__subtitle">Platform-wide order management</p>
        </div>
      </header>
      <Message>{error}</Message>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-card__header">
              <span>
                {order.user?.name} ({order.user?.email})
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
              {new Date(order.createdAt).toLocaleDateString()} — $
              {order.totalAmount.toFixed(2)}
            </p>
            <ul>
              {order.orderItems.map((item) => (
                <li key={item.product}>
                  {item.title} x {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
