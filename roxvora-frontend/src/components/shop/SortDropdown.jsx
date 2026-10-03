
import Select from '@components/common/Select/Select';

const SortDropdown = ({
  options = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'best-selling', label: 'Best Selling' },
    { value: 'rating', label: 'Top Rated' },
  ],
  value,
  onChange,
  placeholder = 'Sort by',
  className = '',
  size = 'sm',
}) => {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      size={size}
    />
  );
};

export default SortDropdown;