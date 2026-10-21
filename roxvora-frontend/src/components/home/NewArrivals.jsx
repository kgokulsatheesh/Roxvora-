import React from 'react';
import ProductSection from './ProductSection';
import BestSellers from './BestSellers';

const NewArrivals = ({ products = [], ...props }) => {
  return (
    <ProductSection
      title="New Arrivals"
      subtitle="Discover our latest drop of architectural silhouettes, hand-stitched details, and effortless seasonal drapes."
      products={products}
      viewAllLink="/shop/new"
      viewAllText="Explore All New Drops"
      showFilters={true}
      {...props}
    />
  );
};

export default NewArrivals;