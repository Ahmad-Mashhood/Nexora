import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/ui/Loader.jsx";
import Message from "../components/ui/Message.jsx";
import { getCart } from "../services/cartService.js";
import { placeOrder } from "../services/orderService.js";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "Cash on Delivery",
  });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getCart();
        if (!data.items?.length) {
          navigate("/cart");
          return;
        }
        setCart(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load cart");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [navigate]);

  const subtotal =
    cart?.items?.reduce(
      (sum, item) => sum + (item.product?.price || 0) * item.quantity,
      0
    ) || 0;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const result = await placeOrder({
        shippingAddress: {
          address: form.address,
          city: form.city,
          postalCode: form.postalCode,
          country: form.country,
        },
        paymentMethod: form.paymentMethod,
      });
      const needsPayment = form.paymentMethod === "Cash on Delivery";
      navigate(needsPayment ? "/payments" : "/orders", {
        state: { message: needsPayment ? "Order placed! Complete payment to sellers." : "Order paid!" },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Order failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader label="Preparing checkout" />;

  return (
    <div className="container page checkout-page">
      <header className="page-header animate-fade-in">
        <div className="page-header__content">
          <span className="page-header__badge">Secure</span>
          <h1 className="page-header__title">Checkout</h1>
          <p className="page-header__subtitle">Shipping & payment details</p>
        </div>
      </header>
      <Message>{error}</Message>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Shipping Address</h2>
          <label>
            Address
            <input name="address" value={form.address} onChange={handleChange} required />
          </label>
          <label>
            City
            <input name="city" value={form.city} onChange={handleChange} required />
          </label>
          <label>
            Postal Code
            <input name="postalCode" value={form.postalCode} onChange={handleChange} required />
          </label>
          <label>
            Country
            <input name="country" value={form.country} onChange={handleChange} required />
          </label>
          <label>
            Payment Method
            <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
              <option value="Cash on Delivery">Cash on Delivery (pay later online)</option>
              <option value="Credit Card (demo)">Credit Card (demo — instant pay)</option>
            </select>
          </label>
          <p className="auth-form__hint">
            COD creates pending payments you complete on the Payments page. Card pays sellers instantly (demo).
          </p>
          <button type="submit" className="btn btn--primary" disabled={submitting}>
            {submitting ? "Placing order..." : "Place Order"}
          </button>
        </form>
        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <ul>
            {cart?.items?.map((item) => (
              <li key={item.product._id}>
                {item.product.title} x {item.quantity}
              </li>
            ))}
          </ul>
          <p className="checkout-total">
            Total: <strong>${subtotal.toFixed(2)}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
