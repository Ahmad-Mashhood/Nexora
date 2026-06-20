import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "../components/ui/Loader.jsx";
import Message from "../components/ui/Message.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { fetchProductById } from "../services/productService.js";
import { addToCart } from "../services/cartService.js";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo, isBuyer } = useAuth();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.response?.data?.message || "Product not found");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleAddToCart = async () => {
    if (!userInfo) {
      navigate("/login");
      return;
    }
    if (!isBuyer) {
      setError("Only buyers can add to cart. Register or login as a buyer.");
      return;
    }
    try {
      await addToCart(product._id, qty);
      setSuccess("Added to cart — ready for checkout!");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not add to cart");
      setSuccess("");
    }
  };

  if (loading) return <Loader label="Loading product" />;
  if (!product) return <div className="container page"><Message>{error}</Message></div>;

  const sellerName = product.seller?.storeName || product.seller?.name;

  return (
    <div className="container page">
      <nav className="breadcrumb animate-fade-in">
        <Link to="/">Shop</Link>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <span>{product.title}</span>
      </nav>
      <div className="product-detail animate-fade-in">
        <div className="product-detail__image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-detail__info panel">
          <span className="badge">{product.category}</span>
          <h1>{product.title}</h1>
          {sellerName && (
            <p className="product-detail__seller">
              Sold by <strong>{sellerName}</strong>
            </p>
          )}
          <p className="product-detail__price">${product.price.toFixed(2)}</p>
          <p className="product-detail__desc">{product.description}</p>
          <p className={product.countInStock > 0 ? "stock" : "stock stock--out"}>
            {product.countInStock > 0
              ? `${product.countInStock} units in stock`
              : "Currently out of stock"}
          </p>
          <Message variant="error">{error}</Message>
          <Message variant="success">{success}</Message>
          {isBuyer && product.countInStock > 0 && (
            <div className="add-to-cart">
              <input
                type="number"
                min="1"
                max={product.countInStock}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
              />
              <button type="button" className="btn btn--primary" onClick={handleAddToCart}>
                Add to cart
              </button>
              <Link to="/cart" className="btn btn--outline">
                View cart
              </Link>
            </div>
          )}
          {userInfo && !isBuyer && (
            <p className="auth-form__hint">Sign in as a buyer to purchase this item.</p>
          )}
          {!userInfo && (
            <Link to="/login" className="btn btn--primary" style={{ marginTop: "1rem" }}>
              Sign in to buy
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
