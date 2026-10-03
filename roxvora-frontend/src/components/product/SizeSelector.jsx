const SizeSelector = ({
  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  selectedSize,
  onChange,
  disabled = false,
  className = '',
  'aria-label': ariaLabel = 'Select size',
}) => {
  return (
    <fieldset className={className} disabled={disabled} aria-disabled={disabled}>
      <legend className="text-sm font-medium text-primary mb-3">Size</legend>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={ariaLabel}>
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            role="radio"
            aria-checked={selectedSize === size}
            onClick={() => !disabled && onChange?.(size)}
            disabled={disabled}
            className={`relative w-12 h-12 rounded-lg border-2 font-medium text-sm transition-all ${
              selectedSize === size
                ? 'border-secondary bg-secondary text-white'
                : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {size}
          </button>
        ))}
      </div>
      {selectedSize && (
        <p className="text-sm text-secondary mt-2" aria-live="polite">
          Selected: <span className="font-medium text-primary">{selectedSize}</span>
        </p>
      )}
    </fieldset>
  );
};

export default SizeSelector;