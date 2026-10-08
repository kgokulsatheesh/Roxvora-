import { FiCreditCard, FiSmartphone, FiGlobe } from 'react-icons/fi';

const METHODS = [
    { id: 'card', label: 'Credit / Debit Card', icon: FiCreditCard },
    { id: 'upi', label: 'UPI', icon: FiSmartphone },
    { id: 'netbanking', label: 'Net Banking', icon: FiGlobe },
];

const PaymentMethod = ({ onSelect, onBack, onNext, selectedMethod = 'card' }) => (
    <div>
        <h2 className="text-lg font-semibold text-primary mb-6">Payment</h2>
        <div className="space-y-3 mb-6" role="radiogroup" aria-label="Payment method">
            {METHODS.map((method) => {
                const Icon = method.icon;
                return (
                    <label
                        key={method.id}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${selectedMethod === method.id ? 'border-secondary bg-secondary/5' : 'border-neutral-200 hover:border-neutral-300'}`}
                    >
                        <input type="radio" name="payment" value={method.id} checked={selectedMethod === method.id} onChange={() => onSelect?.(method.id)} className="sr-only" />
                        <Icon className="w-5 h-5 text-secondary flex-shrink-0" aria-hidden="true" />
                        <span className="font-medium text-primary">{method.label}</span>
                    </label>
                );
            })}
        </div>
        <p className="text-xs text-secondary mb-6">
            This is a demo. No real payment will be charged. Click "Place Order" to complete.
        </p>
        <div className="flex gap-3">
            <button type="button" className="btn btn-outline btn-md" onClick={onBack}>Back</button>
            <button type="button" className="btn btn-primary btn-md flex-1" onClick={() => onNext?.({})}>Place Order</button>
        </div>
    </div>
);

export default PaymentMethod;
