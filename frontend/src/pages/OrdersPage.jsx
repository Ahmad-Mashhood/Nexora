import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/ui/Loader.jsx";
import Message from "../components/ui/Message.jsx";
import { getMyOrders } from "../services/orderService.js";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader label="Loading orders" />;

  return (
    <div className="container page">
      <header className="page-header animate-fade-in">
        <div className="page-header__content">
          <span className="page-header__badge">Buyer</span>
          <h1 className="page-header__title">Order history</h1>
          <p className="page-header__subtitle">Track shipments and payments</p>
        </div>
      </header>
      {location.state?.message && (
        <Message variant="success">{location.state.message}</Message>
      )}
      <Message>{error}</Message>
      {orders.length === 0 ? (
        <div className="empty-state">
          <p>No orders yet.</p>
          <Link to="/" className="btn btn--primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-card__header">
                <span>Order #{order._id.slice(-6)}</span>
                <span className={`status status--${order.status}`}>{order.status}</span>
              </div>
              <p>
                {new Date(order.createdAt).toLocaleDateString()} — $
                {order.totalAmount.toFixed(2)}
                {order.isPaid ? " · Paid" : " · Payment pending"}
              </p>
              <ul>
                {order.orderItems.map((item) => (
                  <li key={`${item.product}-${item.title}`}>
                    {item.title} x {item.quantity}
                  </li>
                ))}
              </ul>
              {!order.isPaid && (
                <Link to="/payments" className="btn btn--primary btn--sm">
                  Complete payment
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
