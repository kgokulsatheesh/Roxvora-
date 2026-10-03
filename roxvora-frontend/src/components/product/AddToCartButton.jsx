import { FiShoppingBag } from 'react-icons/fi';


const AddToCartButton = ({
  onClick,
  isLoading = false,
  disabled = false,
  children = 'Add to Cart',
  className = '',
  variant = 'primary',
  size = 'lg',
  fullWidth = true,
}) => {
  return (
    <button
      type="button"
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'w-full' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <>
          <span className="loader loader-sm loader-white" aria-hidden="true" />
          <span>Adding...</span>
        </>
      ) : (
        <>
          <FiShoppingBag className="w-5 h-5" aria-hidden="true" />
          <span>{children}</span>
        </>
      )}
    </button>
  );
};

export default AddToCartButton;