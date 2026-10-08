import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';

const CartSummary = ({ subtotal = 0, shipping = 0, total = 0, className = '' }) => (
    <div className={`card p-6 ${className}`}>
        <h2 className="font-semibold text-primary text-lg mb-4">Order Summary</h2>
        <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
                <dt className="text-secondary">Subtotal</dt>
                <dd className="font-medium text-primary">{formatCurrency(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
                <dt className="text-secondary">Shipping</dt>
                <dd className="font-medium text-primary">{shipping === 0 ? 'Free' : formatCurrency(shipping)}</dd>
            </div>
            <div className="flex justify-between pt-3 border-t font-semibold text-base text-primary">
                <dt>Total</dt>
                <dd>{formatCurrency(total)}</dd>
            </div>
        </dl>
        <Link to="/checkout" className="btn btn-primary btn-full mt-6">
            Proceed to Checkout
        </Link>
    </div>
);

export default CartSummary;
