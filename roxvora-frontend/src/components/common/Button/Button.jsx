import { forwardRef } from 'react';

/**
 * Button — a simple accessible button component.
 *
 * Props:
 *   variant   'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'  (default 'primary')
 *   size      'sm' | 'md' | 'lg'  (default 'md')
 *   type      'button' | 'submit' | 'reset'  (default 'button')
 *   disabled  boolean
 *   loading   boolean  — shows a spinner and prevents clicks
 *   className extra class names
 *   children  content
 *   ...rest   any other button attributes (onClick, aria-*, form, etc.)
 */
const VARIANT_CLASSES = {
    primary: 'btn btn-primary',
    secondary: 'btn btn-secondary',
    outline: 'btn btn-outline',
    ghost: 'btn btn-ghost',
    danger: 'btn btn-danger',
};

const SIZE_CLASSES = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
};

const Button = forwardRef(function Button(
    {
        variant = 'primary',
        size = 'md',
        type = 'button',
        disabled = false,
        loading = false,
        className = '',
        children,
        ...rest
    },
    ref
) {
    const variantClass = VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.primary;
    const sizeClass = SIZE_CLASSES[size] ?? SIZE_CLASSES.md;

    return (
        <button
            ref={ref}
            type={type}
            disabled={disabled || loading}
            className={`${variantClass} ${sizeClass} inline-flex items-center justify-center gap-2 ${className}`}
            aria-disabled={disabled || loading}
            {...rest}
        >
            {loading && (
                <span
                    className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
                    aria-hidden="true"
                />
            )}
            {children}
        </button>
    );
});

export default Button;
