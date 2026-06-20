import { useEffect, useState } from "react";
import Loader from "../components/ui/Loader.jsx";
import Message from "../components/ui/Message.jsx";
import { getMyPayments, payPayment } from "../services/paymentService.js";

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [payingId, setPayingId] = useState(null);
  const [cardNumber, setCardNumber] = useState("");

  const load = async () => {
    try {
      const data = await getMyPayments();
      setPayments(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handlePay = async (id) => {
    setError("");
    setSuccess("");
    try {
      await payPayment(id, cardNumber || "4242424242424242");
      setSuccess("Payment completed!");
      setCardNumber("");
      await load();
    } catch (err) {
      setError(err.response?.data?.message || "Payment failed");
    } finally {
      setPayingId(null);
    }
  };

  if (loading) return <Loader label="Loading payments" />;

  return (
    <div className="container page">
      <header className="page-header animate-fade-in">
        <div className="page-header__content">
          <span className="page-header__badge">Payments</span>
          <h1 className="page-header__title">My payments</h1>
          <p className="page-header__subtitle">Pay sellers for your orders (demo card)</p>
        </div>
      </header>
      <Message variant="error">{error}</Message>
      <Message variant="success">{success}</Message>

      {payments.length === 0 ? (
        <p className="empty-state">No payments yet. Place an order first.</p>
      ) : (
        <div className="payments-list">
          {payments.map((p) => (
            <div key={p._id} className="payment-card">
              <div className="payment-card__header">
                <span>To: {p.seller?.storeName || p.seller?.name}</span>
                <span className={`status status--${p.status}`}>{p.status}</span>
              </div>
              <p>Amount: <strong>${p.amount.toFixed(2)}</strong></p>
              <p>Method: {p.paymentMethod}</p>
              {p.status === "pending" && (
                <div className="pay-form">
                  <input
                    type="text"
                    placeholder="Card number (demo: 4242424242424242)"
                    value={payingId === p._id ? cardNumber : ""}
                    onChange={(e) => {
                      setPayingId(p._id);
                      setCardNumber(e.target.value);
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn--primary btn--sm"
                    onClick={() => handlePay(p._id)}
                    disabled={payingId === p._id}
                  >
                    Pay Now
                  </button>
                </div>
              )}
              {p.transactionId && <p className="txn">Txn: {p.transactionId}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;
