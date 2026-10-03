
import { FiSearch, FiTrendingUp, FiClock } from 'react-icons/fi';


const SearchSuggestions = ({
  suggestions = [],
  recentSearches = [],
  trendingSearches = [],
  onSelect,
  onClearRecent,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden ${className}`} role="listbox" aria-label="Search suggestions">
      {recentSearches.length > 0 && (
        <div className="p-4 border-b border-neutral-100">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-primary flex items-center gap-2">
              <FiClock className="w-4 h-4" aria-hidden="true" />
              Recent Searches
            </h4>
            {onClearRecent && (
              <button
                type="button"
                className="text-sm text-secondary hover:text-primary"
                onClick={onClearRecent}
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search) => (
              <button
                key={search}
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => onSelect?.(search)}
              >
                <FiSearch className="w-4 h-4" aria-hidden="true" />
                {search}
              </button>
            ))}
          </div>
        </div>
      )}

      {trendingSearches.length > 0 && (
        <div className="p-4 border-b border-neutral-100">
          <h4 className="font-medium text-primary flex items-center gap-2 mb-3">
            <FiTrendingUp className="w-4 h-4" aria-hidden="true" />
            Trending Searches
          </h4>
          <div className="flex flex-wrap gap-2">
            {trendingSearches.map((search) => (
              <button
                key={search}
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => onSelect?.(search)}
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="p-4">
          <h4 className="font-medium text-primary mb-3">Suggestions</h4>
          <ul className="space-y-1" role="list">
            {suggestions.map((suggestion) => (
              <li key={suggestion.id || suggestion.name}>
                <button
                  type="button"
                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-50 transition-colors text-left"
                  onClick={() => onSelect?.(suggestion.name)}
                  role="option"
                >
                  {suggestion.image && (
                    <img
                      src={suggestion.image}
                      alt=""
                      className="w-10 h-10 rounded object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary truncate">{suggestion.name}</p>
                    {suggestion.category && (
                      <p className="text-xs text-secondary">{suggestion.category}</p>
                    )}
                  </div>
                  {suggestion.price && (
                    <span className="text-sm font-semibold text-primary">${suggestion.price.toFixed(2)}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchSuggestions;