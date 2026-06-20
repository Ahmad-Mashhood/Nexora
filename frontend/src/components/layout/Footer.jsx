import { Link } from "react-router-dom";
import Logo from "../ui/Logo.jsx";

const Footer = () => (
  <footer className="footer">
    <div className="container footer__grid">
      <div className="footer__brand">
        <Logo />
        <p>Premium multi-vendor marketplace. Shop smarter, sell globally.</p>
      </div>
      <div className="footer__col">
        <h4>Shop</h4>
        <Link to="/">All products</Link>
        <Link to="/register">Create account</Link>
      </div>
      <div className="footer__col">
        <h4>Sellers</h4>
        <Link to="/register">Open a store</Link>
        <Link to="/login">Seller login</Link>
      </div>
      <div className="footer__col">
        <h4>Support</h4>
        <span>Secure checkout</span>
        <span>Local image hosting</span>
      </div>
    </div>
    <div className="container footer__bottom">
      <p>&copy; {new Date().getFullYear()} Nexora. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
