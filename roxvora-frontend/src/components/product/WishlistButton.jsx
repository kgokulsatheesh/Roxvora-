import { FiHeart } from 'react-icons/fi';

import { useSelector, useDispatch } from 'react-redux';
import { selectWishlistItems } from '@store/slices/wishlistSlice';
import { addToWishlist, removeFromWishlist } from '@store/slices/wishlistSlice';

const WishlistButton = ({
  product,
  onClick,
  className = '',
  size = 'icon',
  showLabel = false,
}) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
    onClick?.(product);
  };

  return (
    <button
      type="button"
      className={`btn btn-ghost btn-${size} rounded-full ${isInWishlist ? 'text-error' : ''} ${className}`}
      onClick={handleClick}
      aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      aria-pressed={isInWishlist}
    >
      <FiHeart className={`${isInWishlist ? 'fill-current' : ''} w-5 h-5`} aria-hidden="true" />
      {showLabel && <span className="hidden sm:inline">{isInWishlist ? 'Saved' : 'Save'}</span>}
    </button>
  );
};

export default WishlistButton;