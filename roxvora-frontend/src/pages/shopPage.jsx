import { FiFilter } from 'react-icons/fi';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductGrid from '../../../components/product/ProductGrid';
import ShopHeader from '../../../components/shop/ShopHeader';
import FilterSidebar from '../../../components/shop/FilterSidebar';
import { selectProducts, selectCategories } from '../../../store/slices/productSlice';

const PRICE_MIN = 0;
const PRICE_MAX = 25000;

const DEFAULT_FILTERS = {
  categories: [],
  priceRange: [PRICE_MIN, PRICE_MAX],
  sizes: [],
  colors: [],
  availability: [],
};

const ShopPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);

  const handleFilterChange = useCallback((filterName, value) => {
    setFilters((prev) => {
      // Ranges are absolute values, so they replace instead of toggling.
      if (filterName === 'priceRange') {
        return { ...prev, priceRange: value };
      }

      const current = prev[filterName];
      if (!Array.isArray(current)) {
        return { ...prev, [filterName]: value };
      }

      return {
        ...prev,
        [filterName]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  }, []);

  const handleFilterGroupClear = useCallback((filterName) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: filterName === 'priceRange' ? [PRICE_MIN, PRICE_MAX] : [],
    }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({ ...DEFAULT_FILTERS, priceRange: [PRICE_MIN, PRICE_MAX] });
  }, []);

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.availability.length > 0 ||
    filters.priceRange[0] !== PRICE_MIN ||
    filters.priceRange[1] !== PRICE_MAX;

  const filteredProducts = products.filter((product) => {
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }
    if (filters.sizes.length > 0 && !filters.sizes.some((s) => product.sizes?.includes(s))) {
      return false;
    }
    if (
      filters.colors.length > 0 &&
      !filters.colors.some((c) => product.colors?.some((col) => col.value === c))
    ) {
      return false;
    }
    if (filters.availability.includes('in-stock') && product.stock === 0) return false;
    if (filters.availability.includes('on-sale') && !product.isSale) return false;
    if (filters.availability.includes('new-arrivals') && !product.isNew) return false;
    if (filters.availability.includes('bestsellers') && !product.isBestSeller) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'best-selling':
        return (b.salesCount || 0) - (a.salesCount || 0);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  const filterConfig = {
    categories: {
      label: 'Categories',
      value: filters.categories,
      options: categories.map((c) => ({ value: c.name, label: c.name, count: c.count })),
    },
    priceRange: {
      label: 'Price Range',
      value: filters.priceRange,
      min: PRICE_MIN,
      max: PRICE_MAX,
    },
    sizes: {
      label: 'Sizes',
      value: filters.sizes,
      options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((s) => ({ value: s, label: s })),
    },
    colors: {
      label: 'Colors',
      value: filters.colors,
      options: [
        { value: '#000000', name: 'Black' },
        { value: '#FFFFFF', name: 'White' },
        { value: '#1a1a2e', name: 'Navy' },
        { value: '#8B4513', name: 'Brown' },
      ],
    },
    availability: {
      label: 'Availability',
      value: filters.availability,
      options: [
        { value: 'in-stock', label: 'In Stock' },
        { value: 'on-sale', label: 'On Sale' },
        { value: 'new-arrivals', label: 'New Arrivals' },
        { value: 'bestsellers', label: 'Best Sellers' },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <ShopHeader
        title="All Products"
        subtitle="Discover our complete collection"
        totalProducts={filteredProducts.length}
        onSortChange={setSortBy}
        onViewChange={setViewMode}
        currentSort={sortBy}
        viewMode={viewMode}
      />

      <div className="flex">
        <FilterSidebar
          filters={filterConfig}
          onFilterChange={handleFilterChange}
          onFilterGroupClear={handleFilterGroupClear}
          onClearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />

        <main className="flex-1 lg:ml-0">
          <ProductGrid
            products={sortedProducts}
            variant={viewMode === 'list' ? 'list' : 'default'}
            className="pb-16"
          />
        </main>
      </div>

      <button
        type="button"
        className="fixed bottom-6 right-6 z-40 lg:hidden btn btn-primary btn-lg shadow-xl"
        onClick={() => setIsFilterOpen(true)}
        aria-label="Open filters"
      >
        <FiFilter className="w-5 h-5" />
        Filters
      </button>
    </div>
  );
};

export default ShopPage;
