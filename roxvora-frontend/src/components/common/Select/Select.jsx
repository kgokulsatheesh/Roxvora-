import { forwardRef } from 'react';

/**
 * Select — a styled accessible select input.
 *
 * Props:
 *   options      {Array}    — [{ value, label }]
 *   value        {string}
 *   onChange     {function} — called with the selected value string
 *   placeholder  {string}   — shown as a disabled first option
 *   size         'sm'|'md'|'lg'  (default 'md')
 *   className    {string}
 *   label        {string}   — visible label (optional)
 *   error        {string}   — error message
 *   ...rest      any other <select> attributes
 */
const SIZE_CLASSES = { sm: 'input-field-sm', md: '', lg: 'input-field-lg' };

const Select = forwardRef(function Select(
    { options = [], value, onChange, placeholder, size = 'md', className = '', label, error, id, ...rest },
    ref
) {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const sizeClass = SIZE_CLASSES[size] ?? '';

    const handleChange = (e) => onChange?.(e.target.value);

    return (
        <div className={className}>
            {label && (
                <label htmlFor={selectId} className="block text-sm font-medium text-primary mb-1.5">
                    {label}
                </label>
            )}
            <select
                ref={ref}
                id={selectId}
                value={value}
                onChange={handleChange}
                className={`input-field w-full ${sizeClass} ${error ? 'border-red-400' : ''}`}
                aria-invalid={error ? 'true' : undefined}
                {...rest}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <p role="alert" className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
});

export default Select;
