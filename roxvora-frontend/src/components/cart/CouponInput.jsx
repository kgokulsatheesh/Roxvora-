import { useState } from 'react';
import { FiTag, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

const CouponInput = ({ onApply, onRemove, appliedCoupon, className = '' }) => {
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleApply = async (e) => {
        e.preventDefault();
        if (!code.trim()) return;
        setIsLoading(true);
        try {
            await onApply?.(code.trim());
            toast.success('Coupon applied!');
            setCode('');
        } catch (err) {
            toast.error(err?.message || 'Invalid coupon code');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`card p-4 ${className}`}>
            <h3 className="font-semibold text-primary text-sm mb-3 flex items-center gap-2">
                <FiTag className="w-4 h-4" aria-hidden="true" />
                Coupon Code
            </h3>

            {appliedCoupon ? (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                    <div>
                        <p className="text-sm font-medium text-green-800">{appliedCoupon.code}</p>
                        <p className="text-xs text-green-600">{appliedCoupon.label}</p>
                    </div>
                    <button type="button" className="btn btn-ghost btn-icon-sm text-green-600" onClick={onRemove} aria-label="Remove coupon">
                        <FiX className="w-4 h-4" aria-hidden="true" />
                    </button>
                </div>
            ) : (
                <form onSubmit={handleApply} className="flex gap-2">
                    <label htmlFor="coupon-code" className="sr-only">Coupon code</label>
                    <input
                        id="coupon-code"
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        placeholder="Enter code"
                        className="input-field flex-1 input-field-sm uppercase"
                        disabled={isLoading}
                    />
                    <button type="submit" className="btn btn-secondary btn-sm" disabled={isLoading || !code.trim()}>
                        {isLoading ? 'Applying…' : 'Apply'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default CouponInput;
