import { formatCurrency } from '../../../utils/formatCurrency';

/**
 * Price — renders a formatted currency value.
 *
 * Props:
 *   current   {number}  — the price to display (required)
 *   original  {number}  — optional original/strike-through price
 *   className {string}  — extra class names on the wrapper span
 */
const Price = ({ current, original, className = '' }) => {
    if (current === null || current === undefined) return null;

    return (
        <span className={`inline-flex items-center gap-2 ${className}`}>
            <span className="font-semibold text-primary">{formatCurrency(current)}</span>
            {original !== undefined && original > current && (
                <span className="text-secondary line-through text-sm font-normal">
                    {formatCurrency(original)}
                </span>
            )}
        </span>
    );
};

export default Price;
