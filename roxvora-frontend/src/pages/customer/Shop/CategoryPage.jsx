import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductGrid from '../../../components/product/ProductGrid';
import ShopHeader from '../../../components/shop/ShopHeader';
import CategoryGrid from '../../../components/shop/CategoryGrid';
import { selectProducts, selectCategories } from '../../../store/slices/productSlice';

const CATEGORY_GROUPS = {
  women: ['Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Knitwear'],
  men: ['Tops', 'Bottoms', 'Outerwear', 'Shoes'],
  kids: ['Boys', 'Girls', 'Baby', 'Toys'],
  accessories: ['Accessories', 'Bags', 'Shoes'],
};

const toTitleCase = (value) =>
  value
    .toLowerCase()
    .split(/[- ]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const CategoryPage = () => {
  const { category: categoryParam, subcategory: subcategoryParam } = useParams();
  const category = categoryParam || '';
  const subcategory = subcategoryParam || '';

  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');

  const allProducts = useSelector(selectProducts);
  const categories = useSelector(selectCategories);

  const products = useMemo(() => {
    const target = category.toLowerCase();
    let matched = allProducts.filter((p) => {
      if (target === 'sale') return Boolean(p.isSale);
      if (target === 'new') return Boolean(p.isNew);
      const group = CATEGORY_GROUPS[target];
      if (group) return group.includes((p.category || '').trim());
      return (p.category || '').toLowerCase() === target;
    });

    if (subcategory && target !== 'sale' && target !== 'new') {
      const sub = subcategory.toLowerCase();
      matched = matched.filter((p) => (p.category || '').toLowerCase() === sub);
    }

    return matched;
  }, [allProducts, category, subcategory]);

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'best-selling':
        return sorted.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      default:
        return sorted;
    }
  }, [products, sortBy]);

  const categoryName = category ? toTitleCase(category) : 'Collection';
  const subcategoryName = subcategory ? toTitleCase(subcategory) : '';
  const displayName = subcategoryName || categoryName;

  return (
    <div className="min-h-screen bg-neutral-50">
      <ShopHeader
        title={displayName}
        subtitle={`Browse our ${displayName.toLowerCase()} collection`}
        totalProducts={products.length}
        currentCategory={categoryName}
        currentCollection={subcategoryName || undefined}
        onSortChange={setSortBy}
        onViewChange={setViewMode}
        currentSort={sortBy}
        viewMode={viewMode}
      />

      <div className="container mx-auto px-4 md:px-8 py-8">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-secondary font-semibold text-primary mb-3">
              No products in {displayName} yet
            </h2>
            <p className="text-secondary mb-8">Explore the rest of our collection instead.</p>
            <Link to="/shop" className="btn btn-primary">Browse All Products</Link>
          </div>
        ) : (
          <ProductGrid
            products={sortedProducts}
            variant={viewMode === 'list' ? 'list' : 'default'}
            className="pb-16"
          />
        )}

        {categories.length > 0 && (
          <section className="mt-16" aria-labelledby="category-grid-heading">
            <h2
              id="category-grid-heading"
              className="text-2xl font-secondary font-semibold text-primary mb-6"
            >
              Shop by Category
            </h2>
            <CategoryGrid categories={categories} />
          </section>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;