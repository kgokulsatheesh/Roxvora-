import { useState, useEffect } from 'react';

export const usePagination = (totalItems, itemsPerPage = 20, initialPage = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Keep the current page in range when the result set shrinks (e.g. filters applied).
  useEffect(() => {
    setCurrentPage((page) => Math.max(1, Math.min(page, Math.max(totalPages, 1))));
  }, [totalPages]);

  const goToPage = (page) => {
    const clampedPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(clampedPage);
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
};