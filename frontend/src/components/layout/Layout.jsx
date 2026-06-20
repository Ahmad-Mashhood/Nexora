import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const Layout = () => (
  <div className="app-shell">
    <div className="app-shell__bg" aria-hidden="true" />
    <Header />
    <main className="main">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
