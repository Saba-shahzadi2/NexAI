const Button = ({
  children = "Send Message",
  type = "button",
  onClick,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-600/10 hover:shadow-xl transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
