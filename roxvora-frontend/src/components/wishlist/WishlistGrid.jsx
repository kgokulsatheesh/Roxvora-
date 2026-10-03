import WishlistItem from './WishlistItem';
import EmptyWishlist from './EmptyWishlist';

const WishlistGrid = ({
  items = [],
  className = '',
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`} aria-busy="true">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="aspect-square skeleton" />
            <div className="p-4 space-y-3">
              <div className="h-4 w-3/4 skeleton skeleton-text" />
              <div className="h-4 w-1/2 skeleton skeleton-text" />
              <div className="h-6 w-24 skeleton skeleton-rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`} role="list" aria-label="Wishlist items">
      {items.map((item) => (
        <div key={item.id} className="card">
          <WishlistItem item={item} />
        </div>
      ))}
    </div>
  );
};

export default WishlistGrid;