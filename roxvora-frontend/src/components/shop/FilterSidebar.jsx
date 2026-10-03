import { useState } from 'react';
import { createPortal } from 'react-dom';
import { FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';
import { formatCurrency } from '@utils/formatCurrency';

const FilterSidebar = ({
  filters = {},
  onFilterChange,
  onFilterGroupClear,
  onClearFilters,
  hasActiveFilters = false,
  className = '',
  isOpen = false,
  onClose,
}) => {
  const [expandedFilters, setExpandedFilters] = useState({
    categories: true,
    priceRange: true,
    sizes: true,
    colors: true,
    availability: true,
  });

  const toggleFilter = (filterName) => {
    setExpandedFilters((prev) => ({ ...prev, [filterName]: !prev[filterName] }));
  };

  const selectedValues = (config) => {
    const v = config.value;
    return Array.isArray(v) ? v : [];
  };

  const renderRangeGroup = (name, config) => {
    const isExpanded = expandedFilters[name];
    const [min, max] = Array.isArray(config.value) ? config.value : [config.min, config.max];
    const step = 50;

    return (
      <div key={name} className="border-b border-neutral-100 last:border-0">
        <button
          type="button"
          className="flex items-center justify-between w-full py-4 font-medium text-primary"
          onClick={() => toggleFilter(name)}
          aria-expanded={isExpanded}
          aria-controls={`${name}-content`}
        >
          <span>{config.label}</span>
          {isExpanded ? (
            <FiChevronUp className="w-5 h-5" aria-hidden="true" />
          ) : (
            <FiChevronDown className="w-5 h-5" aria-hidden="true" />
          )}
        </button>

        <div id={`${name}-content`} hidden={!isExpanded} className="pt-1 pb-4 space-y-3">
          <div className="flex items-center justify-between text-sm text-secondary">
            <label htmlFor={`${name}-min`}>Min</label>
            <label htmlFor={`${name}-max`}>Max</label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              id={`${name}-min`}
              type="number"
              inputMode="numeric"
              min={config.min}
              max={config.max}
              step={step}
              value={min}
              onChange={(e) =>
                onFilterChange?.(name, [
                  Math.min(Number(e.target.value) || 0, max),
                  max,
                ])
              }
              className="input-field input-field-sm"
            />
            <input
              id={`${name}-max`}
              type="number"
              inputMode="numeric"
              min={config.min}
              max={config.max}
              step={step}
              value={max}
              onChange={(e) =>
                onFilterChange?.(name, [
                  min,
                  Math.max(Number(e.target.value) || config.max, min),
                ])
              }
              className="input-field input-field-sm"
            />
          </div>
          <p className="text-xs text-secondary">
            Showing {formatCurrency(min)} to {formatCurrency(max)}
          </p>
        </div>
      </div>
    );
  };

  const renderOptionGroup = (name, config) => {
    const isExpanded = expandedFilters[name];
    const isColorGroup = config.options.every((o) => /^#[0-9a-f]{3,8}$/i.test(o.value));
    const selected = selectedValues(config);
    const hasSelection = selected.length > 0;

    return (
      <div key={name} className="border-b border-neutral-100 last:border-0">
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="flex items-center justify-between flex-1 py-4 font-medium text-primary text-left"
            onClick={() => toggleFilter(name)}
            aria-expanded={isExpanded}
            aria-controls={`${name}-content`}
          >
            <span>{config.label}</span>
            {isExpanded ? (
              <FiChevronUp className="w-5 h-5" aria-hidden="true" />
            ) : (
              <FiChevronDown className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
          {hasSelection && (
            <button
              type="button"
              className="text-xs text-secondary hover:text-primary shrink-0"
              onClick={() => onFilterGroupClear?.(name)}
              aria-label={`Clear ${config.label} filter`}
            >
              Clear
            </button>
          )}
        </div>

        <div id={`${name}-content`} hidden={!isExpanded} className="pt-1 pb-4">
          {config.options.map((option) => {
            const checked = selected.includes(option.value);
            const label = option.label ?? option.name ?? option.value;

            if (isColorGroup) {
              return (
                <label
                  key={option.value}
                  className="flex items-center gap-3 py-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name={`${name}-${option.value}`}
                    value={option.value}
                    checked={checked}
                    onChange={() => onFilterChange?.(name, option.value)}
                    className="sr-only"
                  />
                  <span
                    className={`w-6 h-6 rounded-full border-2 flex-shrink-0 ${
                      checked ? 'border-primary ring-2 ring-secondary/30' : 'border-neutral-300'
                    }`}
                    style={{ backgroundColor: option.value }}
                    aria-hidden="true"
                  />
                  <span className="text-sm text-secondary">{label}</span>
                </label>
              );
            }

            return (
              <label key={option.value} className="flex items-center gap-3 py-2 cursor-pointer">
                <input
                  type="checkbox"
                  name={`${name}-${option.value}`}
                  value={option.value}
                  checked={checked}
                  onChange={() => onFilterChange?.(name, option.value)}
                  className="w-4 h-4 text-secondary border-neutral-300 rounded focus:ring-secondary focus:ring-2"
                />
                <span className="text-sm text-secondary">{label}</span>
                {option.count !== undefined && (
                  <span className="ml-auto text-xs text-neutral-400">({option.count})</span>
                )}
              </label>
            );
          })}
        </div>
      </div>
    );
  };

  const renderFilterGroup = (name, config) => {
    if (Array.isArray(config.options) && config.options.length > 0) {
      return renderOptionGroup(name, config);
    }
    if (config.min !== undefined && config.max !== undefined) {
      return renderRangeGroup(name, config);
    }
    return null;
  };

  const panel = (
    <aside
      id="product-filter-panel"
      className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-neutral-200 transform transition-transform duration-300 lg:relative lg:translate-x-0 lg:z-auto ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } ${className}`}
      aria-label="Product filters"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b lg:hidden">
          <h2 className="text-lg font-semibold text-primary">Filters</h2>
          <button
            type="button"
            className="btn btn-ghost btn-icon"
            onClick={onClose}
            aria-label="Close filters"
          >
            <FiX className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {hasActiveFilters && (
          <div className="p-4 border-b">
            <button
              type="button"
              className="btn btn-outline btn-sm w-full"
              onClick={onClearFilters}
            >
              <FiX className="w-4 h-4" aria-hidden="true" />
              Clear All Filters
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          {Object.entries(filters).map(([name, config]) => renderFilterGroup(name, config))}
        </div>

        <div className="p-4 border-t lg:hidden">
          <button type="button" className="btn btn-primary btn-full" onClick={onClose}>
            Show Results
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {isOpen && (
        createPortal(
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
            onClick={onClose}
            aria-hidden="true"
          />,
          document.body
        )
      )}
      {panel}
    </>
  );
};

export default FilterSidebar;
