import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Logo from "../ui/Logo.jsx";

const Header = () => {
  const { userInfo, logout, isBuyer, isSeller, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    `header__link ${isActive ? "header__link--active" : ""}`;

  return (
    <header className="header">
      <div className="container header__inner">
        <Logo />
        <button
          type="button"
          className="header__toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`header__nav ${menuOpen ? "header__nav--open" : ""}`}>
          <NavLink to="/" className={navLinkClass} end onClick={() => setMenuOpen(false)}>
            Shop
          </NavLink>
          {userInfo ? (
            <>
              {isBuyer && (
                <>
                  <NavLink to="/cart" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                    Cart
                  </NavLink>
                  <NavLink to="/orders" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                    Orders
                  </NavLink>
                  <NavLink to="/payments" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                    Payments
                  </NavLink>
                </>
              )}
              {isSeller && (
                <>
                  <NavLink to="/seller/products" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                    Products
                  </NavLink>
                  <NavLink to="/seller/orders" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                    Sales
                  </NavLink>
                  <NavLink to="/seller/payments" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                    Earnings
                  </NavLink>
                </>
              )}
              {isAdmin && (
                <>
                  <NavLink to="/admin/products" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                    Catalog
                  </NavLink>
                  <NavLink to="/admin/orders" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                    Orders
                  </NavLink>
                </>
              )}
              <div className="header__profile">
                <span className="header__avatar">
                  {(userInfo.name || "U").charAt(0).toUpperCase()}
                </span>
                <div className="header__profile-text">
                  <strong>{userInfo.storeName || userInfo.name}</strong>
                  <small>{userInfo.role}</small>
                </div>
              </div>
              <button type="button" className="btn btn--outline btn--sm" onClick={handleLogout}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                Sign in
              </NavLink>
              <Link to="/register" className="btn btn--primary btn--sm" onClick={() => setMenuOpen(false)}>
                Get started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
