const ColorSelector = ({
  colors = [
    { value: '#000000', name: 'Black' },
    { value: '#FFFFFF', name: 'White' },
    { value: '#1a1a2e', name: 'Navy' },
    { value: '#8B4513', name: 'Brown' },
  ],
  selectedColor,
  onChange,
  disabled = false,
  className = '',
  'aria-label': ariaLabel = 'Select color',
}) => {
  return (
    <fieldset className={className} disabled={disabled} aria-disabled={disabled}>
      <legend className="text-sm font-medium text-primary mb-3">Color</legend>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={ariaLabel}>
        {colors.map((color, index) => (
          <button
            key={`${color.value}-${index}`}
            type="button"
            role="radio"
            aria-checked={selectedColor === color.value}
            aria-label={color.name}
            onClick={() => !disabled && onChange?.(color.value)}
            disabled={disabled}
            className={`relative w-10 h-10 rounded-full border-2 transition-all ${
              selectedColor === color.value
                ? 'border-secondary ring-2 ring-secondary/20'
                : 'border-neutral-200 hover:border-neutral-300'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            style={{ backgroundColor: color.value }}
            title={color.name}
          >
            {selectedColor === color.value && (
              <svg className="absolute inset-0 w-5 h-5 m-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        ))}
      </div>
      {selectedColor && (
        <p className="text-sm text-secondary mt-2" aria-live="polite">
          Selected: <span className="font-medium text-primary capitalize">{colors.find(c => c.value === selectedColor)?.name || selectedColor}</span>
        </p>
      )}
    </fieldset>
  );
};

export default ColorSelector;