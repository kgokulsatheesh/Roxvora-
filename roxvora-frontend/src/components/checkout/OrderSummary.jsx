import { formatCurrency } from '../../utils/formatCurrency';

const OrderSummary = ({ items = [], subtotal = 0, discount = 0, shipping = 0, total = 0 }) => (
    <div className="card p-6 sticky top-24">
        <h2 className="font-semibold text-primary text-lg mb-4">Order Summary</h2>

        <ul className="space-y-3 mb-4 max-h-64 overflow-y-auto" role="list">
            {items.map((item) => (
                <li key={`${item.id}-${item.variantId}`} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                        <img src={item.image || item.images?.[0]} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-primary truncate">{item.name}</p>
                        <p className="text-xs text-secondary">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-primary flex-shrink-0">{formatCurrency(item.price * item.quantity)}</p>
                </li>
            ))}
        </ul>

        <dl className="space-y-2 text-sm border-t pt-4">
            <div className="flex justify-between">
                <dt className="text-secondary">Subtotal</dt>
                <dd className="font-medium">{formatCurrency(subtotal)}</dd>
            </div>
            {discount > 0 && (
                <div className="flex justify-between text-green-600">
                    <dt>Discount</dt>
                    <dd className="font-medium">-{formatCurrency(discount)}</dd>
                </div>
            )}
            <div className="flex justify-between">
                <dt className="text-secondary">Shipping</dt>
                <dd className="font-medium">{shipping === 0 ? 'Free' : formatCurrency(shipping)}</dd>
            </div>
            <div className="flex justify-between pt-2 border-t font-semibold text-base text-primary">
                <dt>Total</dt>
                <dd>{formatCurrency(total)}</dd>
            </div>
        </dl>
    </div>
);

export default OrderSummary;
