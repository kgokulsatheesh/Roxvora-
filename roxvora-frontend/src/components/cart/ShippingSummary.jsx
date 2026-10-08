import { FiTruck, FiCheck } from 'react-icons/fi';
import { formatCurrency } from '../../utils/formatCurrency';

const ShippingSummary = ({ method, cost = 0, estimatedDays, className = '' }) => (
    <div className={`flex items-center gap-3 p-3 rounded-lg border border-neutral-200 ${className}`}>
        <FiTruck className="w-5 h-5 text-secondary flex-shrink-0" aria-hidden="true" />
        <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-primary">{method || 'Standard Shipping'}</p>
            {estimatedDays && <p className="text-xs text-secondary">Estimated {estimatedDays} business days</p>}
        </div>
        <p className="text-sm font-semibold text-primary flex-shrink-0">
            {cost === 0 ? <span className="text-green-600 flex items-center gap-1"><FiCheck className="w-4 h-4" aria-hidden="true" />Free</span> : formatCurrency(cost)}
        </p>
    </div>
);

export default ShippingSummary;
