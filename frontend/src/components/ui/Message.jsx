const Message = ({ variant = "error", children }) => {
  if (!children) return null;
  const icons = { error: "!", success: "✓", info: "i" };
  return (
    <div className={`message message--${variant} animate-fade-in`} role="alert">
      <span className="message__icon">{icons[variant] || icons.error}</span>
      <span>{children}</span>
    </div>
  );
};

export default Message;
