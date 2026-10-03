import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CheckoutStepper from '@components/checkout/CheckoutStepper';
import CustomerInformation from '@components/checkout/CustomerInformation';
import DeliveryInformation from '@components/checkout/DeliveryInformation';
import PaymentMethod from '@components/checkout/PaymentMethod';
import OrderSummary from '@components/checkout/OrderSummary';
import EmptyCart from '@components/cart/EmptyCart';
import { selectCartItems, selectCartCoupon, clearCart } from '@store/slices/cartSlice';
import { placeOrder } from '@store/slices/orderSlice';
import { appConfig } from '@config/appConfig';

const SHIPPING_PRICES = {
  standard: appConfig.cart.defaultShipping,
  express: appConfig.cart.expressShipping,
  overnight: appConfig.cart.overnightShipping,
};

const SHIPPING_LABELS = {
  standard: 'Standard Shipping',
  express: 'Express Shipping',
  overnight: 'Overnight Shipping',
};

const PAYMENT_LABELS = {
  card: 'Credit / Debit Card',
  upi: 'UPI',
  netbanking: 'Net Banking',
};

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const coupon = useSelector(selectCartCoupon);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    customer: {},
    shipping: {},
    payment: {},
  });
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [selectedPayment, setSelectedPayment] = useState('card');

  const steps = [
    { id: 'information', label: 'Information' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'payment', label: 'Payment' },
  ];

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
      : SHIPPING_PRICES[selectedShipping] ?? appConfig.cart.defaultShipping;

  const total = discountedSubtotal + shipping;

  const handleCustomerSubmit = (data) => {
    setFormData((prev) => ({ ...prev, customer: data }));
    setCurrentStep(1);
  };

  const handleShippingSubmit = () => {
    setFormData((prev) => ({ ...prev, shipping: { method: selectedShipping } }));
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (data) => {
    setFormData((prev) => ({ ...prev, payment: { ...prev.payment, ...data } }));

    dispatch(
      placeOrder({
        items,
        subtotal,
        discount,
        shipping,
        total,
        shippingMethod: SHIPPING_LABELS[selectedShipping] ?? 'Standard Shipping',
        paymentMethod: PAYMENT_LABELS[selectedPayment] ?? 'UPI',
        customer: formData.customer ?? {},
      })
    );

    dispatch(clearCart());
    toast.success('Order placed successfully!');
    setFormData({ customer: {}, shipping: {}, payment: {} });
    setCurrentStep(0);
    navigate('/account/orders');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-3xl md:text-4xl font-secondary font-bold text-primary mb-8">Checkout</h1>

        <CheckoutStepper steps={steps} currentStep={currentStep} />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 min-w-0">
            <div className="card p-6 lg:p-8">
              {currentStep === 0 && (
                <CustomerInformation
                  onSubmit={handleCustomerSubmit}
                  onBack={() => navigate('/cart')}
                  defaultValues={formData.customer}
                />
              )}

              {currentStep === 1 && (
                <DeliveryInformation
                  onSelect={setSelectedShipping}
                  onBack={() => setCurrentStep(0)}
                  onNext={handleShippingSubmit}
                  selectedMethod={selectedShipping}
                />
              )}

              {currentStep === 2 && (
                <PaymentMethod
                  onSelect={setSelectedPayment}
                  onBack={() => setCurrentStep(1)}
                  onNext={handlePaymentSubmit}
                  selectedMethod={selectedPayment}
                />
              )}
            </div>
          </div>

          <aside className="min-w-0">
            <OrderSummary
              items={items}
              subtotal={discountedSubtotal}
              discount={discount}
              shipping={shipping}
              total={total}
            />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;