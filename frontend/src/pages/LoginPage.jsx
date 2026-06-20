import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/ui/Message.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await login(email, password);
      if (data.role === "admin") navigate("/admin/orders");
      else if (data.role === "seller") navigate("/seller/products");
      else navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container auth-page">
      <div className="auth-split">
        <div className="auth-split__visual animate-fade-in">
          <h2>Welcome back to Nexora</h2>
          <ul>
            <li>Secure multi-vendor checkout</li>
            <li>Real-time inventory & payments</li>
            <li>Works offline with local images</li>
          </ul>
        </div>
        <form className="auth-form animate-fade-in-delay" onSubmit={handleSubmit}>
          <h1>Sign in</h1>
          <p className="auth-form__subtitle">Access your buyer, seller, or admin dashboard</p>
          <Message>{error}</Message>
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@email.com" />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
          </label>
          <button type="submit" className="btn btn--primary btn--block" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
          <p className="auth-form__footer">
            New here? <Link to="/register">Create an account</Link>
          </p>
          <div className="auth-form__hint">
            <p><strong>Admin:</strong> admin@shop.com / admin123</p>
            <p><strong>Seller:</strong> seller@shop.com / seller123</p>
            <p><strong>Buyer:</strong> buyer@shop.com / buyer123</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
