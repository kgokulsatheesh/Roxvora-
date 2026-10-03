const AvailabilityFilter = ({
  options = [
    { value: 'in-stock', label: 'In Stock' },
    { value: 'on-sale', label: 'On Sale' },
    { value: 'new-arrivals', label: 'New Arrivals' },
    { value: 'bestsellers', label: 'Best Sellers' },
  ],
  selectedOptions = [],
  onChange,
  className = '',
  'aria-label': ariaLabel = 'Filter by availability',
}) => {
  return (
    <fieldset className={className} aria-label={ariaLabel}>
      <legend className="visually-hidden">Filter by availability</legend>
      <div className="space-y-2" role="group">
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-3 cursor-pointer py-2">
            <input
              type="checkbox"
              value={option.value}
              checked={selectedOptions.includes(option.value)}
              onChange={(e) => {
                const newOptions = e.target.checked
                  ? [...selectedOptions, option.value]
                  : selectedOptions.filter((o) => o !== option.value);
                onChange?.(newOptions);
              }}
              className="w-4 h-4 text-secondary border-neutral-300 rounded focus:ring-secondary focus:ring-2"
            />
            <span className="text-sm text-secondary">{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default AvailabilityFilter;