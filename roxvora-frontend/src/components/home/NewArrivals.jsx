import { memo } from 'react';
import ProductSection from './ProductSection';

/**
 * New Arrivals collection.
 * Filter pills are derived from each product's `category`, so no hard-coded list is needed.
 * Any prop passed in (title, maxProducts, categories, currency...) overrides the defaults below.
 */
const NewArrivals = ({ products = [], ...props }) => (
  <ProductSection
    title="New Arrivals"
    subtitle="Discover our latest drop of architectural silhouettes, hand-stitched details, and effortless seasonal drapes."
    products={products}
    viewAllLink="/shop/new"
    viewAllText="Explore All New Drops"
    showFilters
    maxProducts={8}
    {...props}
  />
);

export default memo(NewArrivals);