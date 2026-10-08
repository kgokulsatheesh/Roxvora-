import { forwardRef } from 'react';

/**
 * Input — generic accessible input component.
 *
 * Props:
 *   label       {string}   — visible label text (optional)
 *   error       {string}   — error message shown below the input
 *   hint        {string}   — helper text shown below the input
 *   size        'sm' | 'md' | 'lg'  (default 'md')
 *   className   {string}   — extra classes on the wrapper div
 *   inputClass  {string}   — extra classes on the <input>
 *   ...rest     any HTML input attribute
 */
const SIZE_CLASSES = {
    sm: 'input-field-sm',
    md: '',
    lg: 'input-field-lg',
};

const Input = forwardRef(function Input(
    {
        label,
        error,
        hint,
        size = 'md',
        className = '',
        inputClass = '',
        id,
        ...rest
    },
    ref
) {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const errorId = error && inputId ? `${inputId}-error` : undefined;
    const hintId = hint && inputId ? `${inputId}-hint` : undefined;

    const sizeClass = SIZE_CLASSES[size] ?? SIZE_CLASSES.md;

    return (
        <div className={className}>
            {label && (
                <label htmlFor={inputId} className="block text-sm font-medium text-primary mb-1.5">
                    {label}
                </label>
            )}
            <input
                ref={ref}
                id={inputId}
                className={`input-field w-full ${sizeClass} ${error ? 'border-red-400 focus:ring-red-300' : ''} ${inputClass}`}
                aria-describedby={[errorId, hintId].filter(Boolean).join(' ') || undefined}
                aria-invalid={error ? 'true' : undefined}
                {...rest}
            />
            {error && (
                <p id={errorId} role="alert" className="mt-1 text-xs text-red-600">
                    {error}
                </p>
            )}
            {hint && !error && (
                <p id={hintId} className="mt-1 text-xs text-secondary">
                    {hint}
                </p>
            )}
        </div>
    );
});

export default Input;
