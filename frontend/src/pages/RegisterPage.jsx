import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/ui/Message.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [storeName, setStoreName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await register(name, email, password, role, storeName);
      if (data.role === "seller") navigate("/seller/products");
      else navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container auth-page">
      <div className="auth-split">
        <div className="auth-split__visual animate-fade-in">
          <h2>Join Nexora today</h2>
          <ul>
            <li>Buy from verified sellers</li>
            <li>Open your store in minutes</li>
            <li>Demo payments built-in</li>
          </ul>
        </div>
        <form className="auth-form animate-fade-in-delay" onSubmit={handleSubmit}>
          <h1>Create account</h1>
          <p className="auth-form__subtitle">Start shopping or launch your storefront</p>
          <Message>{error}</Message>

          <label>
            Account type
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="buyer">Buyer — shop & checkout</option>
              <option value="seller">Seller — list products</option>
            </select>
          </label>

          <label>
            Full name
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>

          {role === "seller" && (
            <label>
              Store name
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="Your brand name"
              />
            </label>
          )}

          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>

          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} required />
          </label>

          <button type="submit" className="btn btn--primary btn--block" disabled={loading}>
            {loading ? "Creating…" : role === "seller" ? "Launch my store" : "Create account"}
          </button>

          <p className="auth-form__footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
