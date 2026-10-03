import { useSelector } from 'react-redux';
import { selectWishlistItems } from '@store/slices/wishlistSlice';
import WishlistGrid from '@components/wishlist/WishlistGrid';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';


const WishlistPage = () => {
  const items = useSelector(selectWishlistItems);

  return (
    <div className="min-h-screen bg-neutral-50 py-16 lg:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-secondary font-bold text-primary mb-2">My Wishlist</h1>
            <p className="text-secondary">You have {items.length} item{items.length !== 1 ? 's' : ''} saved</p>
          </div>
          {items.length > 0 && (
            <Link to="/shop" className="btn btn-ghost btn-md mt-4 sm:mt-0">
              <FiArrowRight className="w-5 h-5" />
              Continue Shopping
            </Link>
          )}
        </div>

        <WishlistGrid items={items} />
      </div>
    </div>
  );
};

export default WishlistPage;