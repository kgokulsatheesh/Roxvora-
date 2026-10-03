import { Link } from 'react-router-dom';
import { FiSearch, FiTag, FiStar } from 'react-icons/fi';


const SearchEmptyState = ({
  query = '',
  suggestions = [],
  className = '',
}) => {
  return (
    <div className={`text-center py-16 ${className}`} role="status">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neutral-100 flex items-center justify-center">
        <FiSearch className="w-10 h-10 text-neutral-400" aria-hidden="true" />
      </div>
      <h2 className="text-xl font-medium text-primary mb-2">No results for &quot;{query}&quot;</h2>
      <p className="text-secondary mb-8">We couldn&apos;t find any products matching your search</p>

      <div className="space-y-4 mb-8 max-w-md mx-auto text-left">
        <div className="p-4 bg-neutral-50 rounded-lg">
          <h4 className="font-medium text-primary mb-2 flex items-center gap-2">
            <FiStar className="w-5 h-5" aria-hidden="true" />
            Search Tips
          </h4>
          <ul className="space-y-1 text-sm text-secondary">
            <li>• Check your spelling</li>
            <li>• Try more general keywords</li>
            <li>• Try different keywords</li>
            <li>• Use fewer keywords</li>
          </ul>
        </div>

        {suggestions.length > 0 && (
          <div>
            <h4 className="font-medium text-primary mb-3 flex items-center gap-2">
              <FiTag className="w-5 h-5" aria-hidden="true" />
              Suggested Categories
            </h4>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestions.map((cat) => (
                <Link
                  key={cat}
                  to={`/shop/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  className="btn btn-outline btn-sm"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Link to="/shop" className="btn btn-primary">
        Browse All Products
      </Link>
    </div>
  );
};

export default SearchEmptyState;