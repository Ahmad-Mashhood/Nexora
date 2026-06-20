import { Link } from "react-router-dom";
import { useInView } from "../../hooks/useInView.js";

const ProductCard = ({ product, index = 0 }) => {
  const [ref, inView] = useInView();
  const sellerName = product.seller?.storeName || product.seller?.name;
  const lowStock = product.countInStock > 0 && product.countInStock <= 5;

  return (
    <Link
      to={`/product/${product._id}`}
      ref={ref}
      className={`product-card ${inView ? "product-card--visible" : ""}`}
      style={{ animationDelay: `${(index % 8) * 0.06}s` }}
    >
      <div className="product-card__image-wrap">
        <img src={product.image} alt={product.title} className="product-card__image" loading="lazy" />
        <div className="product-card__overlay">
          <span className="product-card__cta">View details</span>
        </div>
        {product.countInStock === 0 && (
          <span className="product-card__badge product-card__badge--sold">Sold out</span>
        )}
        {lowStock && (
          <span className="product-card__badge product-card__badge--low">Only {product.countInStock} left</span>
        )}
      </div>
      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <h3 className="product-card__title">{product.title}</h3>
        {sellerName && <p className="product-card__seller">{sellerName}</p>}
        <div className="product-card__footer">
          <p className="product-card__price">${product.price.toFixed(2)}</p>
          <span className="product-card__arrow" aria-hidden="true">→</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
