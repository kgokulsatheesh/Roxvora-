
import ProductCard from '@components/product/ProductCard';
import { FiSearch } from 'react-icons/fi';


const SearchResults = ({
  query = '',
  results = [],
  totalResults = 0,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  isLoading = false,
  className = '',
}) => {
  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`} aria-busy="true">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }, (_, i) => (
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
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="mb-6">
        <p className="text-secondary">
          Showing <strong>{results.length}</strong> of <strong>{totalResults}</strong> results for{" "}
          <span className="text-primary">&quot;{query}&quot;</span>
        </p>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-16">
          <FiSearch className="text-neutral-300 text-6xl mb-4" aria-hidden="true" />
          <h3 className="text-xl font-medium text-primary mb-2">No results found</h3>
          <p className="text-secondary mb-6">
            We couldn&apos;t find any products matching &quot;{query}&quot;
          </p>
          <div className="space-y-2 text-sm text-secondary">
            <p>Try checking your spelling</p>
            <p>Use more general terms</p>
            <p>Try different keywords</p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="flex justify-center" aria-label="Search results pagination">
              <ul className="flex items-center gap-2">
                <li>
                  <button
                    type="button"
                    className="btn btn-ghost btn-icon-sm"
                    onClick={() => onPageChange?.(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </li>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <li key={pageNum}>
                      <button
                        type="button"
                        className={`btn btn-sm ${currentPage === pageNum ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => onPageChange?.(pageNum)}
                        aria-label={`Page ${pageNum}`}
                        aria-current={currentPage === pageNum ? 'page' : undefined}
                      >
                        {pageNum}
                      </button>
                    </li>
                  );
                })}
                <li>
                  <button
                    type="button"
                    className="btn btn-ghost btn-icon-sm"
                    onClick={() => onPageChange?.(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;