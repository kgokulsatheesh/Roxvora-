import { Fragment, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiX, FiSearch } from 'react-icons/fi';

import { useSelector } from 'react-redux';
import { selectProducts } from '@store/slices/productSlice';
import SearchBar from './SearchBar';
import { formatCurrency } from '@utils/formatCurrency';

const SearchDrawer = ({ isOpen, onClose }) => {
  const products = useSelector(selectProducts);
  const [query, setQuery] = useState('');

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    onClose();
    // Navigate to search page with query
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  if (!isOpen) return null;

  return createPortal(
    <Fragment>
      <div
        className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed top-0 left-0 right-0 z-50 animate-slide-down">
        <div className="bg-white border-b border-neutral-200">
          <div className="container mx-auto px-4 py-4 md:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="btn btn-ghost btn-icon lg:hidden"
                  onClick={onClose}
                  aria-label="Close search"
                >
                  <FiX className="w-6 h-6" aria-hidden="true" />
                </button>
                <SearchBar onSearch={handleSearch} placeholder="Search products, categories, brands..." />
                <button
                  type="button"
                  className="btn btn-secondary btn-md hidden lg:block"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white max-h-[60vh] overflow-y-auto">
          <div className="container mx-auto px-4 py-6 md:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Popular Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Women', 'Men', 'Kids', 'Accessories', 'Sale', 'New Arrivals'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={() => handleSearch(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Trending Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Summer Dresses', 'Running Shoes', 'Leather Jacket', 'Denim Jeans', 'Wireless Earbuds', 'Smart Watch'].map((term) => (
                      <button
                        key={term}
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() => handleSearch(term)}
                      >
                        <FiSearch className="w-4 h-4" aria-hidden="true" />
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {query && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Results for &quot;{query}&quot;</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {products
                      .filter((p) =>
                        p.name.toLowerCase().includes(query.toLowerCase()) ||
                        p.category.toLowerCase().includes(query.toLowerCase())
                      )
                      .slice(0, 6)
                      .map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          className="flex items-center gap-3 p-2 hover:bg-neutral-50 rounded-lg transition-colors text-left"
                          onClick={() => handleSearch(product.name)}
                        >
                          <img
                            src={product.images?.[0] || '/images/placeholders/product.jpg'}
                            alt=""
                            className="w-16 h-16 object-cover rounded"
                            aria-hidden="true"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-primary truncate">{product.name}</p>
                            <p className="text-sm text-secondary">{formatCurrency(product.price)}</p>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>,
    document.body
  );
};

export default SearchDrawer;