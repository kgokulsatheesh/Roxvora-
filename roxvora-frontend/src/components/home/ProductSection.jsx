import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import { motion } from 'framer-motion';
import ProductCard from '@components/product/ProductCard';

const ProductSection = ({
  title,
  subtitle,
  products = [],
  viewAllLink,
  viewAllText = 'View All',
  maxProducts = 8,
  className = '',
}) => {
  const displayProducts = products.slice(0, maxProducts);

  const headingId = `${(title || 'products').toLowerCase().replace(/\s+/g, '-')}-heading`;

  return (
    <section className={`py-16 md:py-24 ${className}`} aria-labelledby={headingId}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
          <div>
            <h2
              id={headingId}
              className="text-3xl md:text-4xl font-secondary font-semibold text-primary mb-2"
            >
              {title}
            </h2>
            {subtitle && <p className="text-secondary text-lg">{subtitle}</p>}
          </div>
          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="btn btn-ghost btn-md mt-4 sm:mt-0 group inline-flex items-center gap-2"
            >
              {viewAllText}
              <FiChevronRight
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          )}
        </div>

        {displayProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-secondary">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.5,
                  delay: (index % 4) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const NewArrivals = ({ products = [], ...props }) => {
  return (
    <ProductSection
      title="New Arrivals"
      subtitle="Fresh styles just landed"
      products={products}
      viewAllLink="/shop/new"
      {...props}
    />
  );
};

const BestSellers = ({ products = [], ...props }) => {
  return (
    <ProductSection
      title="Best Sellers"
      subtitle="Our most loved products"
      products={products}
      viewAllLink="/shop/best-sellers"
      {...props}
    />
  );
};

export { ProductSection, NewArrivals, BestSellers };