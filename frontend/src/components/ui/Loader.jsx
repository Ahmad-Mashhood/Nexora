const Loader = ({ label = "Loading" }) => (
  <div className="loader-wrap" role="status" aria-label={label}>
    <div className="loader">
      <div className="loader__ring" />
      <div className="loader__logo">N</div>
    </div>
    <p className="loader__text">{label}…</p>
  </div>
);

export default Loader;
