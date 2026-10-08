import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { selectCartItems, selectCartCoupon, clearCart, setCoupon, removeCoupon } from '../../../store/slices/cartSlice';
import CartList from '../../../components/cart/CartList';
import CartSummary from '../../../components/cart/CartSummary';
import CouponInput from '../../../components/cart/CouponInput';
import EmptyCart from '../../../components/cart/EmptyCart';
import Button from '../../../components/common/Button/Button';
import { formatCurrency } from '../../../utils/formatCurrency';
import { appConfig } from '../../../config/appConfig';

// Demo coupon codes. Replace with a real API call when the backend is wired.
const COUPONS = {
  ROXVORA10: { type: 'percentage', value: 10, label: '10% off' },
  WELCOME200: { type: 'fixed', value: 200, label: '\u20B9200 off' },
};

const CartPage = () => {
  const items = useSelector(selectCartItems);
  const coupon = useSelector(selectCartCoupon);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const discount = coupon
    ? coupon.type === 'percentage'
      ? (subtotal * coupon.value) / 100
      : Math.min(coupon.value, subtotal)
    : 0;

  const discountedSubtotal = subtotal - discount;

  const shipping =
    discountedSubtotal === 0 || discountedSubtotal >= appConfig.cart.freeShippingThreshold
      ? 0
      : appConfig.cart.defaultShipping;

  const total = discountedSubtotal + shipping;

  const handleApplyCoupon = async (code) => {
    const found = COUPONS[code.toUpperCase()];
    if (!found) {
      throw new Error(`"${code}" is not a valid coupon code`);
    }
    dispatch(setCoupon({ code: code.toUpperCase(), ...found }));
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-16 lg:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-3xl md:text-4xl font-secondary font-bold text-primary mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 min-w-0">
            <div className="card overflow-hidden">
              <div className="border-b bg-neutral-50 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-primary">Cart Items ({items.length})</h2>
                  {items.length > 1 && (
                    <button
                      type="button"
                      className="text-sm text-error hover:underline"
                      onClick={handleClearCart}
                    >
                      Clear Cart
                    </button>
                  )}
                </div>
              </div>

              <CartList items={items} />

              <div className="p-6 border-t flex justify-end">
                <Link to="/shop" className="btn btn-ghost btn-md">
                  <FiArrowRight className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          <aside className="min-w-0">
            <CartSummary
              subtotal={discountedSubtotal}
              shipping={shipping}
              total={total}
              className="sticky top-24 md:top-32"
            />

            <CouponInput
              className="mt-6"
              onApply={handleApplyCoupon}
              appliedCoupon={coupon}
              onRemove={handleRemoveCoupon}
            />

            <div className="mt-6 p-4 bg-neutral-50 rounded-xl">
              <h3 className="font-semibold text-primary mb-3">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary">Subtotal</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount ({coupon.code})</span>
                    <span className="font-medium">-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-secondary">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : formatCurrency(shipping)}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-primary">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              className="mt-6 w-full btn-lg"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </Button>

            <p className="text-center text-sm text-secondary mt-4">
              Secure checkout powered by Stripe &amp; PayPal
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CartPage;