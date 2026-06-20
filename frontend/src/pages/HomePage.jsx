import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/products/ProductCard.jsx";
import Loader from "../components/ui/Loader.jsx";
import Message from "../components/ui/Message.jsx";
import { fetchProducts } from "../services/productService.js";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))].sort();
    return ["all", ...cats];
  }, [products]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return list;
  }, [products, category, search, sort]);

  if (loading) return <Loader label="Loading catalog" />;

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content animate-fade-in">
            <span className="hero__eyebrow">Multi-vendor marketplace</span>
            <h1 className="hero__title">
              Discover gear from <span>trusted sellers</span>
            </h1>
            <p className="hero__desc">
              Curated tech, home, and lifestyle products — secure checkout, real-time inventory, offline-ready images.
            </p>
            <div className="hero__stats">
              <div className="hero__stat">
                <strong>{products.length}</strong>
                <span>Products</span>
              </div>
              <div className="hero__stat">
                <strong>{categories.length - 1}</strong>
                <span>Categories</span>
              </div>
              <div className="hero__stat">
                <strong>24/7</strong>
                <span>Shopping</span>
              </div>
            </div>
          </div>
          <div className="hero__search-card animate-fade-in-delay">
            <label className="hero__search-label">Search the catalog</label>
            <input
              type="search"
              className="hero__search-input"
              placeholder="Headphones, keyboard, lamp…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      <div className="container page">
        <Message>{error}</Message>

        <div className="toolbar animate-fade-in">
          <div className="toolbar__filters">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`chip ${category === cat ? "chip--active" : ""}`}
                onClick={() => setCategory(cat)}
              >
                {cat === "all" ? "All" : cat}
              </button>
            ))}
          </div>
          <select className="toolbar__sort" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        <p className="results-count">
          Showing <strong>{filtered.length}</strong> product{filtered.length !== 1 ? "s" : ""}
        </p>

        {filtered.length === 0 ? (
          <div className="empty-state empty-state--card">
            <div className="empty-state__icon">🔍</div>
            <h3>No matches found</h3>
            <p>Try a different search or category filter.</p>
            <button type="button" className="btn btn--outline" onClick={() => { setSearch(""); setCategory("all"); }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filtered.map((product, i) => (
              <ProductCard key={product._id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
