import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import Select from '@components/common/Select/Select';

const ShopHeader = ({
  title = 'Shop',
  subtitle = 'Discover our latest collections',
  totalProducts = 0,
  currentCategory = null,
  currentCollection = null,
  onSortChange,
  onViewChange,
  sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'best-selling', label: 'Best Selling' },
    { value: 'rating', label: 'Top Rated' },
  ],
  currentSort = 'featured',
  viewMode = 'grid',
  className = '',
}) => {
  return (
    <header className={`py-8 md:py-12 ${className}`} aria-labelledby="shop-title">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mb-8">
          <nav className="flex items-center gap-2 text-sm text-secondary mb-4" aria-label="Breadcrumb">
            <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
            {currentCategory && (
              <>
                <FiChevronRight className="w-4 h-4" aria-hidden="true" />
                <span className="text-primary font-medium">{currentCategory}</span>
              </>
            )}
            {currentCollection && (
              <>
                <FiChevronRight className="w-4 h-4" aria-hidden="true" />
                <span className="text-primary font-medium">{currentCollection}</span>
              </>
            )}
          </nav>
          <h1 id="shop-title" className="text-3xl md:text-4xl font-secondary font-bold text-primary mb-2">
            {title}
          </h1>
          <p className="text-secondary text-lg">{subtitle}</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-secondary">
            Showing <strong>{totalProducts}</strong> product{totalProducts !== 1 ? 's' : ''}
          </p>

          <div className="flex items-center gap-4">
            <Select
              options={sortOptions}
              value={currentSort}
              onChange={onSortChange}
              placeholder="Sort by"
              className="w-48"
              size="sm"
            />

            <div className="flex items-center gap-1 bg-neutral-100 rounded-lg p-1" role="group" aria-label="View mode">
              <button
                type="button"
                className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-white text-primary shadow-sm' : 'text-neutral-500 hover:text-primary'}`}
                onClick={() => onViewChange?.('grid')}
                aria-label="Grid view"
                aria-pressed={viewMode === 'grid'}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                type="button"
                className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-white text-primary shadow-sm' : 'text-neutral-500 hover:text-primary'}`}
                onClick={() => onViewChange?.('list')}
                aria-label="List view"
                aria-pressed={viewMode === 'list'}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ShopHeader;