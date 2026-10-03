import { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';


const QuantitySelector = ({
  value = 1,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
  className = '',
  'aria-label': ariaLabel = 'Quantity',
}) => {
  const [localValue, setLocalValue] = useState(value);

  const handleIncrement = () => {
    if (localValue < max) {
      const newValue = localValue + 1;
      setLocalValue(newValue);
      onChange?.(newValue);
    }
  };

  const handleDecrement = () => {
    if (localValue > min) {
      const newValue = localValue - 1;
      setLocalValue(newValue);
      onChange?.(newValue);
    }
  };

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value, 10) || min;
    const clampedValue = Math.min(Math.max(newValue, min), max);
    setLocalValue(clampedValue);
    onChange?.(clampedValue);
  };

  const handleBlur = () => {
    const clampedValue = Math.min(Math.max(localValue, min), max);
    setLocalValue(clampedValue);
    onChange?.(clampedValue);
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <label htmlFor="quantity" className="text-sm font-medium text-primary">
        Quantity
      </label>
      <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden" role="spinbutton" aria-label={ariaLabel} aria-valuemin={min} aria-valuemax={max} aria-valuenow={localValue} aria-valuetext={`${localValue} items`}>
        <button
          type="button"
          className="btn btn-ghost btn-icon-sm p-2"
          onClick={handleDecrement}
          disabled={disabled || localValue <= min}
          aria-label="Decrease quantity"
        >
          <FiMinus className="w-4 h-4" aria-hidden="true" />
        </button>
        <input
          id="quantity"
          type="number"
          value={localValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          min={min}
          max={max}
          className="w-16 text-center border-0 focus:outline-none focus:ring-0 bg-transparent"
          disabled={disabled}
          aria-hidden="true"
        />
        <button
          type="button"
          className="btn btn-ghost btn-icon-sm p-2"
          onClick={handleIncrement}
          disabled={disabled || localValue >= max}
          aria-label="Increase quantity"
        >
          <FiPlus className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;