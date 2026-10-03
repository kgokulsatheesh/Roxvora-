const SearchFilters = ({
  filters = {},
  onFilterChange,
  onClearAll,
  className = '',
}) => {
  return (
    <div className={`space-y-6 ${className}`} role="region" aria-label="Search filters">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-primary">Filters</h3>
        {Object.values(filters).some((f) => f.value?.length > 0) && (
          <button
            type="button"
            className="text-sm text-secondary hover:text-primary"
            onClick={onClearAll}
          >
            Clear All
          </button>
        )}
      </div>

      {Object.entries(filters).map(([key, config]) => (
        <fieldset key={key} className="border-b border-neutral-100 pb-6 last:border-0">
          <legend className="font-medium text-primary mb-3">{config.label}</legend>
          <div className="space-y-2">
            {config.options.map((option) => (
              <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.value?.includes(option.value)}
                  onChange={() => onFilterChange?.(key, option.value)}
                  className="w-4 h-4 text-secondary border-neutral-300 rounded focus:ring-secondary focus:ring-2"
                />
                <span className="text-sm text-secondary">{option.label}</span>
                {option.count !== undefined && (
                  <span className="ml-auto text-xs text-neutral-400">({option.count})</span>
                )}
              </label>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
};

export default SearchFilters;