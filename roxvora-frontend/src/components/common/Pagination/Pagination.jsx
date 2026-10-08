import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

/**
 * Pagination — accessible page navigation.
 *
 * Props:
 *   currentPage      {number}
 *   totalPages       {number}
 *   onPageChange     {function} — called with the new page number
 *   maxVisiblePages  {number}   — max page buttons to show (default 5)
 *   showFirstLast    {boolean}
 *   showPrevNext     {boolean}
 *   className        {string}
 */
const Pagination = ({
    currentPage = 1,
    totalPages = 1,
    onPageChange,
    maxVisiblePages = 5,
    showFirstLast = false,
    showPrevNext = true,
    className = '',
}) => {
    if (totalPages <= 1) return null;

    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);
    if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
    }

    const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

    const go = (page) => {
        const clamped = Math.min(Math.max(1, page), totalPages);
        if (clamped !== currentPage) onPageChange?.(clamped);
    };

    const btnBase = 'inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-colors';
    const activeClass = 'bg-primary text-white';
    const inactiveClass = 'text-neutral-600 hover:bg-neutral-100';
    const disabledClass = 'opacity-40 cursor-not-allowed';

    return (
        <nav className={`flex items-center justify-center gap-1 ${className}`} aria-label="Pagination">
            {showFirstLast && (
                <button
                    type="button"
                    className={`${btnBase} ${currentPage === 1 ? disabledClass : inactiveClass}`}
                    onClick={() => go(1)}
                    disabled={currentPage === 1}
                    aria-label="First page"
                >
                    <FiChevronsLeft className="w-4 h-4" aria-hidden="true" />
                </button>
            )}

            {showPrevNext && (
                <button
                    type="button"
                    className={`${btnBase} ${currentPage === 1 ? disabledClass : inactiveClass}`}
                    onClick={() => go(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                >
                    <FiChevronLeft className="w-4 h-4" aria-hidden="true" />
                </button>
            )}

            {start > 1 && (
                <>
                    <button type="button" className={`${btnBase} ${inactiveClass}`} onClick={() => go(1)} aria-label="Page 1">1</button>
                    {start > 2 && <span className="px-1 text-neutral-400">…</span>}
                </>
            )}

            {pages.map((page) => (
                <button
                    key={page}
                    type="button"
                    className={`${btnBase} ${page === currentPage ? activeClass : inactiveClass}`}
                    onClick={() => go(page)}
                    aria-label={`Page ${page}`}
                    aria-current={page === currentPage ? 'page' : undefined}
                >
                    {page}
                </button>
            ))}

            {end < totalPages && (
                <>
                    {end < totalPages - 1 && <span className="px-1 text-neutral-400">…</span>}
                    <button type="button" className={`${btnBase} ${inactiveClass}`} onClick={() => go(totalPages)} aria-label={`Page ${totalPages}`}>{totalPages}</button>
                </>
            )}

            {showPrevNext && (
                <button
                    type="button"
                    className={`${btnBase} ${currentPage === totalPages ? disabledClass : inactiveClass}`}
                    onClick={() => go(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                >
                    <FiChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
            )}

            {showFirstLast && (
                <button
                    type="button"
                    className={`${btnBase} ${currentPage === totalPages ? disabledClass : inactiveClass}`}
                    onClick={() => go(totalPages)}
                    disabled={currentPage === totalPages}
                    aria-label="Last page"
                >
                    <FiChevronsRight className="w-4 h-4" aria-hidden="true" />
                </button>
            )}
        </nav>
    );
};

export default Pagination;
