import { FiTruck } from 'react-icons/fi';

const METHODS = [
    { id: 'standard', label: 'Standard Shipping', description: '3-5 business days', price: 99 },
    { id: 'express', label: 'Express Shipping', description: '2 business days', price: 199 },
    { id: 'overnight', label: 'Overnight Shipping', description: 'Next business day', price: 299 },
];

const DeliveryInformation = ({ onSelect, onBack, onNext, selectedMethod = 'standard' }) => (
    <div>
        <h2 className="text-lg font-semibold text-primary mb-6">Delivery Method</h2>
        <div className="space-y-3 mb-6" role="radiogroup" aria-label="Shipping method">
            {METHODS.map((method) => (
                <label
                    key={method.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${selectedMethod === method.id ? 'border-secondary bg-secondary/5' : 'border-neutral-200 hover:border-neutral-300'}`}
                >
                    <input type="radio" name="shipping" value={method.id} checked={selectedMethod === method.id} onChange={() => onSelect?.(method.id)} className="sr-only" />
                    <FiTruck className="w-5 h-5 text-secondary flex-shrink-0" aria-hidden="true" />
                    <div className="flex-1">
                        <p className="font-medium text-primary">{method.label}</p>
                        <p className="text-sm text-secondary">{method.description}</p>
                    </div>
                    <p className="font-semibold text-primary">₹{method.price}</p>
                </label>
            ))}
        </div>
        <div className="flex gap-3">
            <button type="button" className="btn btn-outline btn-md" onClick={onBack}>Back</button>
            <button type="button" className="btn btn-primary btn-md flex-1" onClick={onNext}>Continue to Payment</button>
        </div>
    </div>
);

export default DeliveryInformation;
