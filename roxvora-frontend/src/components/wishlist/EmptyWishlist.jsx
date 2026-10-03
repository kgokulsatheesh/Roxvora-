import { Link } from 'react-router-dom';
import { FiHeart, FiArrowRight } from 'react-icons/fi';


const EmptyWishlist = ({ className = '' }) => {
  return (
    <div className={`text-center py-16 ${className}`} role="status">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neutral-100 flex items-center justify-center">
        <FiHeart className="w-10 h-10 text-neutral-400" aria-hidden="true" />
      </div>
      <h2 className="text-xl font-medium text-primary mb-2">Your wishlist is empty</h2>
      <p className="text-secondary mb-8">Save items you love for later</p>
      <Link to="/shop" className="btn btn-primary inline-flex items-center gap-2">
        Start Shopping
        <FiArrowRight className="w-5 h-5" aria-hidden="true" />
      </Link>
    </div>
  );
};

export default EmptyWishlist;