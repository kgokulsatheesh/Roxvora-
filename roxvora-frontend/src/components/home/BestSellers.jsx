import React from 'react';
import ProductSection from './ProductSection';

const BestSellers = ({ products = [], ...props }) => {
  return (
    <ProductSection
      title="Best Sellers"
      subtitle="The most coveted, iconic wardrobe essentials adored and worn by our global clientele."
      products={products}
      viewAllLink="/shop/best-sellers"
      viewAllText="View Best Sellers"
      {...props}
    />
  );
};

export default BestSellers;