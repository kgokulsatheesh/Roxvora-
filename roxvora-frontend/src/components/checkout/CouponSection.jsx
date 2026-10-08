import CouponInput from '../cart/CouponInput';

// CouponSection — thin wrapper used inside the checkout flow.
const CouponSection = ({ onApply, onRemove, appliedCoupon, className = '' }) => (
    <CouponInput
        onApply={onApply}
        onRemove={onRemove}
        appliedCoupon={appliedCoupon}
        className={className}
    />
);

export default CouponSection;
