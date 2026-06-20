import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/ui/Loader.jsx";
import Message from "../components/ui/Message.jsx";
import {
  getCart,
  updateCartItem,
  removeFromCart,
} from "../services/cartService.js";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleQtyChange = async (productId, quantity) => {
    try {
      const data = await updateCartItem(productId, quantity);
      setCart(data);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  const handleRemove = async (productId) => {
    try {
      const data = await removeFromCart(productId);
      setCart(data);
    } catch (err) {
      setError(err.response?.data?.message || "Remove failed");
    }
  };

  const subtotal =
    cart?.items?.reduce(
      (sum, item) => sum + (item.product?.price || 0) * item.quantity,
      0
    ) || 0;

  if (loading) return <Loader label="Loading cart" />;

  return (
    <div className="container page">
      <header className="page-header animate-fade-in">
        <div className="page-header__content">
          <span className="page-header__badge">Checkout</span>
          <h1 className="page-header__title">Your cart</h1>
          <p className="page-header__subtitle">Review items before checkout</p>
        </div>
      </header>
      <Message>{error}</Message>

      {!cart?.items?.length ? (
        <div className="empty-state">
          <p>Your cart is empty.</p>
          <Link to="/" className="btn btn--primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.items.map((item) => (
              <div key={item.product._id} className="cart-item">
                <img src={item.product.image} alt={item.product.title} />
                <div className="cart-item__info">
                  <Link to={`/product/${item.product._id}`}>
                    <h3>{item.product.title}</h3>
                  </Link>
                  <p>${item.product.price.toFixed(2)}</p>
                  <div className="cart-item__actions">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQtyChange(item.product._id, Number(e.target.value))
                      }
                    />
                    <button
                      type="button"
                      className="btn btn--ghost"
                      onClick={() => handleRemove(item.product._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="cart-item__total">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Summary</h2>
            <p>
              Subtotal: <strong>${subtotal.toFixed(2)}</strong>
            </p>
            <button
              type="button"
              className="btn btn--primary btn--block"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
