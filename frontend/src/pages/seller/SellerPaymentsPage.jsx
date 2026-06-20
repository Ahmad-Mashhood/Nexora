import { useEffect, useState } from "react";
import Loader from "../../components/ui/Loader.jsx";
import Message from "../../components/ui/Message.jsx";
import { getSellerPayments } from "../../services/paymentService.js";

const SellerPaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getSellerPayments();
        setPayments(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load payments");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader label="Loading earnings" />;

  const totalEarned = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="container page">
      <header className="page-header animate-fade-in">
        <div className="page-header__content">
          <span className="page-header__badge">Seller</span>
          <h1 className="page-header__title">Earnings</h1>
          <p className="page-header__subtitle">Payments received from buyers</p>
        </div>
      </header>
      <Message>{error}</Message>
      <p className="earnings-total">Total earned: <strong>${totalEarned.toFixed(2)}</strong></p>
      {payments.length === 0 ? (
        <p className="empty-state">No payments yet.</p>
      ) : (
        <div className="payments-list">
          {payments.map((p) => (
            <div key={p._id} className="payment-card">
              <div className="payment-card__header">
                <span>From: {p.buyer?.name}</span>
                <span className={`status status--${p.status}`}>{p.status}</span>
              </div>
              <p>Amount: <strong>${p.amount.toFixed(2)}</strong></p>
              <p>Method: {p.paymentMethod}</p>
              {p.transactionId && <p className="txn">Txn: {p.transactionId}</p>}
              <p className="muted">{new Date(p.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerPaymentsPage;
