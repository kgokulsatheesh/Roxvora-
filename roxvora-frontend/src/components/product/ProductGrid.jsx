import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import Pagination from '@components/common/Pagination/Pagination';
import { FiPackage, FiChevronRight } from 'react-icons/fi';


const ProductGrid = ({
  products = [],
  title,
  subtitle,
  viewAllLink,
  viewAllText = 'View All',
  productsPerPage = 20,
  currentPage = 1,
  onPageChange,
  totalProducts = 0,
  isLoading = false,
  emptyMessage = 'No products found',
  className = '',
  variant = 'default',
}) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 8 }, (_, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                <div className="card">
                  <div className="aspect-square skeleton" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 w-3/4 skeleton skeleton-text" />
                    <div className="h-4 w-1/2 skeleton skeleton-text" />
                    <div className="h-6 w-24 skeleton skeleton-rounded" />
                  </div>
                </div>
              </motion.div>
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
              <a
                href={viewAllLink}
                className="btn btn-ghost btn-md mt-4 sm:mt-0"
              >
                {viewAllText}
                <FiChevronRight className="w-5 h-5" aria-hidden="true" />
              </a>
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
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                >
                  <ProductCard product={product} variant={variant} />
                </motion.div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-10">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                  showFirstLast
                  showPrevNext
                  maxVisiblePages={5}
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;