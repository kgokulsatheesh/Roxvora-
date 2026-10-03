import CategoryCard from './CategoryCard';

const CategoryGrid = ({
  categories = [],
  columns = { base: 1, sm: 2, lg: 3, xl: 4 },
  className = '',
}) => {
  if (categories.length === 0) return null;

  const gridCols = `grid-cols-${columns.base} sm:grid-cols-${columns.sm} lg:grid-cols-${columns.lg} xl:grid-cols-${columns.xl}`;

  return (
    <div className={`grid ${gridCols} gap-6 ${className}`} role="list" aria-label="Categories">
      {categories.map((category, index) => (
        <CategoryCard key={category.id || index} category={category} />
      ))}
    </div>
  );
};

export default CategoryGrid;