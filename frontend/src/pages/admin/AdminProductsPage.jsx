import { useEffect, useState } from "react";
import Loader from "../../components/ui/Loader.jsx";
import Message from "../../components/ui/Message.jsx";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productService.js";

const emptyForm = {
  title: "",
  price: "",
  description: "",
  image: "",
  category: "",
  countInStock: "",
};

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
      countInStock: product.countInStock,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const payload = {
      ...form,
      price: Number(form.price),
      countInStock: Number(form.countInStock),
    };
    try {
      if (editId) {
        await updateProduct(editId, payload);
        setSuccess("Product updated");
      } else {
        await createProduct(payload);
        setSuccess("Product created");
      }
      setForm(emptyForm);
      setEditId(null);
      await loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Save failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      setSuccess("Product deleted");
      await loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading) return <Loader label="Loading catalog" />;

  return (
    <div className="container page admin-page">
      <header className="page-header animate-fade-in">
        <div className="page-header__content">
          <span className="page-header__badge">Admin</span>
          <h1 className="page-header__title">Product catalog</h1>
          <p className="page-header__subtitle">Manage all marketplace listings</p>
        </div>
      </header>
      <Message variant="error">{error}</Message>
      <Message variant="success">{success}</Message>

      <form className="admin-form" onSubmit={handleSubmit}>
        <h2>{editId ? "Edit Product" : "Add Product"}</h2>
        <div className="admin-form__grid">
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
          <input name="price" type="number" step="0.01" placeholder="Price" value={form.price} onChange={handleChange} required />
          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
          <input name="countInStock" type="number" placeholder="Stock" value={form.countInStock} onChange={handleChange} required />
          <input
            name="image"
            placeholder="Image path e.g. /images/your-photo.jpg"
            value={form.image}
            onChange={handleChange}
            required
            className="span-2"
          />
          <p className="auth-form__hint span-2">
            Local images: put files in <code>frontend/public/images/</code> and use <code>/images/filename.jpg</code>
          </p>
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="span-2" />
        </div>
        <div className="admin-form__actions">
          <button type="submit" className="btn btn--primary">
            {editId ? "Update" : "Create"}
          </button>
          {editId && (
            <button type="button" className="btn btn--ghost" onClick={() => { setEditId(null); setForm(emptyForm); }}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="admin-table">
        {products.map((p) => (
          <div key={p._id} className="admin-table__row">
            <img src={p.image} alt={p.title} />
            <div>
              <strong>{p.title}</strong>
              <p>${p.price} — {p.countInStock} in stock</p>
            </div>
            <div className="admin-table__actions">
              <button type="button" className="btn btn--ghost" onClick={() => handleEdit(p)}>Edit</button>
              <button type="button" className="btn btn--ghost" onClick={() => handleDelete(p._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductsPage;
