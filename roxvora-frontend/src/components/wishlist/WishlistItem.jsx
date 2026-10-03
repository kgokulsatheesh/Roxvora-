import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { addToCart } from '@store/slices/cartSlice';
import { removeFromWishlist } from '@store/slices/wishlistSlice';
import Price from '@components/common/Price/Price';

const WishlistItem = ({ item, className = '' }) => {
  const dispatch = useDispatch();

  const handleMoveToCart = () => {
    dispatch(addToCart({ ...item, quantity: 1 }));
    dispatch(removeFromWishlist(item.id));
    toast.success(`${item.name} moved to cart`);
  };

  const handleRemove = () => {
    dispatch(removeFromWishlist(item.id));
    toast.success(`${item.name} removed from wishlist`);
  };

  const image = item.images?.[0] || item.image || '/images/placeholders/product.jpg';
  const inStock = item.stock === undefined || item.stock > 0;

  return (
    <div className={`flex gap-4 p-4 border-b border-neutral-100 ${className}`} data-item-id={item.id}>
      <Link
        to={`/product/${item.slug}`}
        className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden"
        aria-hidden="true"
      >
        <img src={image} alt="" className="w-full h-full object-cover" loading="lazy" />
      </Link>

      <div className="flex-1 min-w-0">
        <Link to={`/product/${item.slug}`} className="block">
          <h3 className="font-medium text-primary truncate hover:text-secondary transition-colors">
            {item.name}
          </h3>
        </Link>

        {item.category && (
          <p className="text-xs uppercase tracking-wider text-secondary mt-0.5">{item.category}</p>
        )}

        <Price current={item.price} original={item.originalPrice} className="mt-1" />

        {!inStock && (
          <p className="text-xs text-error mt-1">Out of stock</p>
        )}

        <div className="flex items-center gap-3 mt-3">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleMoveToCart}
            disabled={!inStock}
          >
            Move to Cart
          </button>

          <Link to={`/product/${item.slug}`} className="btn btn-ghost btn-sm text-secondary hover:text-primary">
            View Details
          </Link>

          <button
            type="button"
            className="btn btn-ghost btn-icon-sm text-error hover:text-error ml-auto"
            onClick={handleRemove}
            aria-label={`Remove ${item.name} from wishlist`}
          >
            <FiTrash2 className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;