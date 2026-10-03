import { Link } from 'react-router-dom';
import { FiPackage, FiChevronRight, FiShoppingBag } from 'react-icons/fi';

import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { addToCart } from '@store/slices/cartSlice';
import Rating from '@components/common/Rating/Rating';
import Price from '@components/common/Price/Price';

const ProductList = ({
  products = [],
  title,
  subtitle,
  viewAllLink,
  viewAllText = 'View All',
  isLoading = false,
  emptyMessage = 'No products found',
  className = '',
}) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success(`${product.name} added to cart`);
  };
  if (isLoading) {
    return (
      <section className={`py-16 ${className}`} aria-label={`${title} loading`}>
        <div className="container mx-auto px-4 md:px-8">
          {title && (
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-secondary font-bold text-primary mb-2">{title}</h2>
                {subtitle && <p className="text-secondary text-lg">{subtitle}</p>}
              </div>
            </div>
          )}
          <div className="space-y-4">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="card flex gap-4 p-4">
                <div className="w-24 h-24 skeleton skeleton-rectangular flex-shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 w-1/2 skeleton skeleton-text" />
                  <div className="h-4 w-1/3 skeleton skeleton-text" />
                  <div className="h-6 w-32 skeleton skeleton-rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 ${className}`} aria-labelledby={title ? `${title.toLowerCase().replace(/\s+/g, '-')}-heading` : undefined}>
      <div className="container mx-auto px-4 md:px-8">
        {title && (
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
            <div>
              <h2 id={`${title.toLowerCase().replace(/\s+/g, '-')}-heading`} className="text-3xl md:text-4xl font-secondary font-bold text-primary mb-2">
                {title}
              </h2>
              {subtitle && <p className="text-secondary text-lg">{subtitle}</p>}
            </div>
            {viewAllLink && (
              <Link
                to={viewAllLink}
                className="btn btn-ghost btn-md mt-4 sm:mt-0"
              >
                {viewAllText}
                <FiChevronRight className="w-5 h-5" aria-hidden="true" />
              </Link>
            )}
          </div>
        )}

        {products.length === 0 ? (
          <div className="text-center py-16">
            <FiPackage className="text-neutral-300 text-6xl mb-4" aria-hidden="true" />
            <h3 className="text-xl font-medium text-primary mb-2">{emptyMessage}</h3>
            <p className="text-secondary">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="space-y-4" role="list">
            {products.map((product) => (
              <article key={product.id} className="card flex gap-4 p-4" role="listitem">
                <Link to={`/product/${product.slug}`} className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden" aria-hidden="true">
                  <img
                    src={product.images?.[0] || '/images/placeholders/product.jpg'}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </Link>
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <p className="text-xs font-medium text-secondary uppercase tracking-wider">{product.category}</p>
                    <Link to={`/product/${product.slug}`} className="block">
                      <h3 className="font-medium text-primary mt-1 line-clamp-1 hover:text-secondary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 mt-2">
                      {product.rating && (
                        <Rating value={product.rating} max={5} size="sm" readonly showLabel />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <Price current={product.price} original={product.originalPrice} />
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <FiShoppingBag className="w-4 h-4" aria-hidden="true" />
                      {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductList;