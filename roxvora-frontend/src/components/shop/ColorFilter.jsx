const ColorFilter = ({
  colors = [
    { value: '#000000', name: 'Black' },
    { value: '#FFFFFF', name: 'White' },
    { value: '#1a1a2e', name: 'Navy' },
    { value: '#8B4513', name: 'Brown' },
    { value: '#FF0000', name: 'Red' },
    { value: '#0000FF', name: 'Blue' },
    { value: '#00FF00', name: 'Green' },
    { value: '#FFFF00', name: 'Yellow' },
  ],
  selectedColors = [],
  onChange,
  className = '',
  'aria-label': ariaLabel = 'Select colors',
}) => {
  return (
    <fieldset className={className} aria-label={ariaLabel}>
      <legend className="visually-hidden">Select colors</legend>
      <div className="flex flex-wrap gap-2" role="group">
        {colors.map((color) => (
          <label key={color.value} className="cursor-pointer group">
            <input
              type="checkbox"
              value={color.value}
              checked={selectedColors.includes(color.value)}
              onChange={(e) => {
                const newColors = e.target.checked
                  ? [...selectedColors, color.value]
                  : selectedColors.filter((c) => c !== color.value);
                onChange?.(newColors);
              }}
              className="sr-only"
            />
            <span
              className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                selectedColors.includes(color.value)
                  ? 'border-secondary ring-2 ring-secondary/20'
                  : 'border-neutral-200 hover:border-neutral-300'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            >
              {selectedColors.includes(color.value) && (
                <svg className="absolute inset-0 w-5 h-5 m-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default ColorFilter;