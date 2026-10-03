import { useState, useRef, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

import { useSelector } from 'react-redux';
import { selectProducts } from '@store/slices/productSlice';
import { formatCurrency } from '@utils/formatCurrency';

const SearchBar = ({ onSearch, placeholder = 'Search products...', className = '' }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const products = useSelector(selectProducts);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredProducts = query
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch?.(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleFocus = () => {
    if (query.trim()) setShowSuggestions(true);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`} ref={inputRef} role="search">
      <label htmlFor="search-input" className="visually-hidden">
        Search products
      </label>
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" aria-hidden="true" />
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={handleFocus}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2.5 bg-neutral-100 border-0 rounded-full text-primary placeholder-neutral-400 focus:bg-white focus:ring-2 focus:ring-secondary focus:outline-none transition-all"
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls="search-suggestions"
          aria-expanded={showSuggestions && filteredProducts.length > 0}
        />
        {query && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-primary transition-colors"
            onClick={() => setQuery('')}
            aria-label="Clear search"
          >
            <FiX className="w-5 h-5" aria-hidden="true" />
          </button>
        )}
      </div>

      {showSuggestions && filteredProducts.length > 0 && (
        <ul id="search-suggestions" className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-neutral-200 overflow-hidden z-50 animate-slide-down" role="listbox">
          {filteredProducts.map((product) => (
            <li key={product.id} role="option">
              <button
                type="button"
                className="w-full px-4 py-3 text-left hover:bg-neutral-50 transition-colors flex items-center gap-3"
                onClick={() => {
                  setQuery(product.name);
                  onSearch?.(product.name);
                  setShowSuggestions(false);
                }}
              >
                <img
                  src={product.images?.[0] || '/images/placeholders/product.jpg'}
                  alt=""
                  className="w-10 h-10 object-cover rounded"
                  aria-hidden="true"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary truncate">{product.name}</p>
                  <p className="text-xs text-secondary">{formatCurrency(product.price)}</p>
                </div>
              </button>
            </li>
          ))}
          <li role="separator" className="border-t border-neutral-100" />
          <li role="option">
            <button
              type="button"
              className="w-full px-4 py-3 text-left hover:bg-neutral-50 transition-colors flex items-center gap-3 text-secondary"
              onClick={() => onSearch?.(query)}
            >
              <FiSearch className="w-5 h-5" aria-hidden="true" />
              <span>Search for &quot;{query}&quot;</span>
            </button>
          </li>
        </ul>
      )}
    </form>
  );
};

export default SearchBar;