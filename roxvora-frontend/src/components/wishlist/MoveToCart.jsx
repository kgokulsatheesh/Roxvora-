import { FiShoppingBag } from 'react-icons/fi';


const MoveToCart = ({ onClick, className = '', disabled = false }) => {
  return (
    <button
      type="button"
      className={`btn btn-primary btn-sm flex items-center gap-2 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <FiShoppingBag className="w-4 h-4" aria-hidden="true" />
      Move to Cart
    </button>
  );
};

export default MoveToCart;