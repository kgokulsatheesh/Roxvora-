import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';

import { useSelector } from 'react-redux';
import { selectWishlistItems } from '@store/slices/wishlistSlice';

const WishlistIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const items = useSelector(selectWishlistItems);
  const count = items.length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="relative btn btn-ghost btn-icon-lg p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Wishlist${count > 0 ? ` with ${count} items` : ''}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="wishlist-dropdown"
      >
        <FiHeart className="w-6 h-6 text-primary" aria-hidden="true" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-secondary rounded-full">
            {count > 99 ? '99+' : count}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          id="wishlist-dropdown"
          className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden z-50 animate-slide-down"
          role="menu"
          aria-label="Wishlist"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="font-semibold text-primary">Wishlist</h3>
            <span className="text-sm text-secondary">{count} item{count !== 1 ? 's' : ''}</span>
          </div>

          {items.length === 0 ? (
            <div className="p-8 text-center">
              <FiHeart className="w-12 h-12 text-neutral-300 mx-auto mb-3" aria-hidden="true" />
              <p className="text-secondary">Your wishlist is empty</p>
              <Link to="/shop" className="btn btn-primary btn-sm mt-4" onClick={() => setIsOpen(false)}>
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              <ul className="divide-y divide-neutral-100" role="list">
                {items.slice(0, 5).map((item) => (
                  <li key={item.id} className="p-4" role="menuitem">
                    <Link to={`/product/${item.slug}`} className="flex gap-3" onClick={() => setIsOpen(false)}>
                      <img
                        src={item.image || '/images/placeholders/product.jpg'}
                        alt=""
                        className="w-16 h-16 object-cover rounded-lg"
                        aria-hidden="true"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-primary truncate">{item.name}</p>
                        <p className="text-sm text-secondary mt-1">${item.price.toFixed(2)}</p>
                        <button
                          type="button"
                          className="text-xs text-secondary hover:text-primary mt-1"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              {items.length > 5 && (
                <div className="p-4 text-center border-t">
                  <Link to="/wishlist" className="text-sm text-secondary hover:text-primary" onClick={() => setIsOpen(false)}>
                    View all {count} items
                  </Link>
                </div>
              )}
            </div>
          )}

          <div className="p-4 border-t">
            <Link
              to="/wishlist"
              className="btn btn-primary btn-full btn-sm"
              onClick={() => setIsOpen(false)}
            >
              View Wishlist
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistIcon;