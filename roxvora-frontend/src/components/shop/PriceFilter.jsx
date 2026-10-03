import { useState, useEffect } from 'react';

const PriceFilter = ({
  min = 0,
  max = 25000,
  value = [0, 25000],
  onChange,
  step = 100,
  currency = '₹',
  className = '',
  'aria-label': ariaLabel = 'Price range',
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange?.(localValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  const handleMinChange = (e) => {
    const newMin = Math.min(parseInt(e.target.value, 10) || min, localValue[1]);
    setLocalValue([newMin, localValue[1]]);
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(parseInt(e.target.value, 10) || max, localValue[0]);
    setLocalValue([localValue[0], newMax]);
  };

  const minPercent = ((localValue[0] - min) / (max - min)) * 100;
  const maxPercent = ((localValue[1] - min) / (max - min)) * 100;

  return (
    <div className={className} role="group" aria-label={ariaLabel}>
      <div className="flex items-center gap-2 mb-4">
        <label htmlFor="price-min" className="text-sm font-medium text-primary w-12">Min</label>
        <input
          id="price-min"
          type="number"
          value={localValue[0]}
          onChange={handleMinChange}
          min={min}
          max={localValue[1]}
          step={step}
          className="flex-1 input-field input-field-sm"
          aria-label="Minimum price"
        />
      </div>

      <div className="flex items-center gap-2 mb-4">
        <label htmlFor="price-max" className="text-sm font-medium text-primary w-12">Max</label>
        <input
          id="price-max"
          type="number"
          value={localValue[1]}
          onChange={handleMaxChange}
          min={localValue[0]}
          max={max}
          step={step}
          className="flex-1 input-field input-field-sm"
          aria-label="Maximum price"
        />
      </div>

      <div className="relative h-6" role="slider" aria-label="Price range slider" aria-valuemin={min} aria-valuemax={max} aria-valuenow={`${localValue[0]} - ${localValue[1]}`} tabIndex={0}>
        <div
          className="absolute inset-0 bg-neutral-200 rounded-full"
          aria-hidden="true"
        />
        <div
          className="absolute h-full bg-secondary rounded-full"
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
          aria-hidden="true"
        />
        <button
          type="button"
          className="absolute top-1/2 w-4 h-4 bg-white border-2 border-secondary rounded-full -translate-y-1/2 transform transition-transform"
          style={{ left: `calc(${minPercent}% - 8px)` }}
          aria-label={`Minimum price: ${currency}${localValue[0].toLocaleString('en-IN')}`}
        />
        <button
          type="button"
          className="absolute top-1/2 w-4 h-4 bg-white border-2 border-secondary rounded-full -translate-y-1/2 transform transition-transform"
          style={{ left: `calc(${maxPercent}% - 8px)` }}
          aria-label={`Maximum price: ${currency}${localValue[1].toLocaleString('en-IN')}`}
        />
      </div>

      <div className="flex justify-between text-xs text-secondary mt-2">
        <span>{currency}{min.toLocaleString('en-IN')}</span>
        <span>{currency}{max.toLocaleString('en-IN')}</span>
      </div>
    </div>
  );
};

export default PriceFilter;