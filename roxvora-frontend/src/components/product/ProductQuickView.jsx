import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { FiX, FiShoppingBag, FiHeart, FiChevronRight } from 'react-icons/fi';

import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addToWishlist, removeFromWishlist } from '@store/slices/wishlistSlice';
import { addToCart } from '@store/slices/cartSlice';
import Price from '@components/common/Price/Price';
import Rating from '@components/common/Rating/Rating';

const getSizes = (product) => {
  if (Array.isArray(product?.sizes) && product.sizes.length > 0) return product.sizes;
  if (Array.isArray(product?.variants)) {
    const sizes = product.variants.map((v) => v.size || v.name).filter(Boolean);
    if (sizes.length > 0) return sizes;
  }
  return ['XS', 'S', 'M', 'L', 'XL'];
};

const ProductQuickView = ({ product, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product?.id);
  const [selectedSize, setSelectedSize] = useState('');
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  const sizes = getSizes(product);

  useEffect(() => {
    if (isOpen && sizes.length === 1) {
      setSelectedSize(sizes[0]);
    }
  }, [isOpen, sizes]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previouslyFocused = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusables = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    if (sizes.length > 1 && !selectedSize) {
      toast.error('Please select a size');
      return;
    }
    dispatch(addToCart({ ...product, size: selectedSize || undefined, quantity: 1 }));
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlistToggle = () => {
    dispatch(isInWishlist ? removeFromWishlist(product.id) : addToWishlist(product));
    toast.success(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-primary-900/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
        className="relative w-full sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl animate-slide-up"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white text-primary-900 inline-flex items-center justify-center shadow-sm"
          aria-label="Close quick view"
        >
          <FiX className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="grid sm:grid-cols-2">
          <div className="relative aspect-square bg-neutral-100">
            <img
              src={product.images?.[0] || '/images/placeholders/product.jpg'}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="p-6 sm:p-8 flex flex-col">
            {product.category && (
              <p className="text-xs font-medium text-secondary uppercase tracking-wider mb-2">
                {product.category}
              </p>
            )}

            <h3 id="quick-view-title" className="text-xl font-secondary font-semibold text-primary mb-2">
              {product.name}
            </h3>

            {product.rating && (
              <div className="mb-3">
                <Rating value={product.rating} max={5} size="sm" readonly />
              </div>
            )}

            <div className="mb-4">
              <Price
                current={product.price}
                original={product.originalPrice}
                currentClassName="text-2xl font-secondary font-semibold"
              />
            </div>

            {product.description && (
              <p className="text-secondary text-sm leading-relaxed mb-5 line-clamp-4">
                {product.description}
              </p>
            )}

            <fieldset className="mb-5">
              <legend className="text-xs font-medium uppercase tracking-wider text-secondary mb-2">
                Size
              </legend>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={selectedSize === size}
                    className={`min-w-[44px] px-3 py-2 text-sm border rounded-md transition-all ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-white'
                        : 'border-neutral-300 text-primary hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-auto flex flex-col gap-2">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="btn btn-primary btn-lg w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiShoppingBag className="w-5 h-5" aria-hidden="true" />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleWishlistToggle}
                  className={`btn btn-outline flex-1 justify-center ${isInWishlist ? 'text-error' : ''}`}
                >
                  <FiHeart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} aria-hidden="true" />
                  {isInWishlist ? 'Saved' : 'Wishlist'}
                </button>

                <Link
                  to={`/product/${product.slug}`}
                  onClick={onClose}
                  className="btn btn-outline flex-1 justify-center"
                >
                  Full Details
                  <FiChevronRight className="w-5 h-5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProductQuickView;
