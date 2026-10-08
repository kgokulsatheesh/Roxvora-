import { FiStar } from 'react-icons/fi';

/**
 * Rating — read-only or interactive star rating.
 *
 * Props:
 *   value      {number}   — current rating (0-max)
 *   max        {number}   — number of stars (default 5)
 *   size       'sm'|'md'|'lg'  (default 'md')
 *   readonly   {boolean}
 *   showLabel  {boolean}  — show numeric label next to stars
 *   onChange   {function} — called with new value when interactive
 *   className  {string}
 */
const SIZE_MAP = { sm: 'w-3.5 h-3.5', md: 'w-4.5 h-4.5', lg: 'w-5 h-5' };

const Rating = ({
    value = 0,
    max = 5,
    size = 'md',
    readonly = false,
    showLabel = false,
    onChange,
    className = '',
}) => {
    const iconSize = SIZE_MAP[size] ?? SIZE_MAP.md;

    return (
        <span
            className={`inline-flex items-center gap-0.5 ${className}`}
            role={readonly ? 'img' : 'group'}
            aria-label={`Rating: ${value} out of ${max} stars`}
        >
            {Array.from({ length: max }, (_, i) => {
                const filled = i < Math.round(value);
                return (
                    <span
                        key={i}
                        role={readonly ? undefined : 'button'}
                        tabIndex={readonly ? undefined : 0}
                        aria-label={readonly ? undefined : `Rate ${i + 1} star${i + 1 !== 1 ? 's' : ''}`}
                        onClick={readonly ? undefined : () => onChange?.(i + 1)}
                        onKeyDown={readonly ? undefined : (e) => { if (e.key === 'Enter' || e.key === ' ') onChange?.(i + 1); }}
                        className={readonly ? '' : 'cursor-pointer'}
                    >
                        <FiStar
                            className={`${iconSize} ${filled ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'}`}
                            aria-hidden="true"
                        />
                    </span>
                );
            })}
            {showLabel && (
                <span className="ml-1 text-sm font-medium text-secondary">{Number(value).toFixed(1)}</span>
            )}
        </span>
    );
};

export default Rating;
