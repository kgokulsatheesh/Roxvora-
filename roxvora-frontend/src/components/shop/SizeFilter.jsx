const SizeFilter = ({
  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  selectedSizes = [],
  onChange,
  className = '',
  'aria-label': ariaLabel = 'Select sizes',
}) => {
  return (
    <fieldset className={className} aria-label={ariaLabel}>
      <legend className="visually-hidden">Select sizes</legend>
      <div className="flex flex-wrap gap-2" role="group">
        {sizes.map((size) => (
          <label key={size} className="cursor-pointer">
            <input
              type="checkbox"
              value={size}
              checked={selectedSizes.includes(size)}
              onChange={(e) => {
                const newSizes = e.target.checked
                  ? [...selectedSizes, size]
                  : selectedSizes.filter((s) => s !== size);
                onChange?.(newSizes);
              }}
              className="sr-only"
            />
            <span className={`inline-flex items-center justify-center w-10 h-10 rounded-lg border-2 font-medium text-sm transition-all ${
              selectedSizes.includes(size)
                ? 'border-secondary bg-secondary text-white'
                : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50'
            }`}>
              {size}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default SizeFilter;