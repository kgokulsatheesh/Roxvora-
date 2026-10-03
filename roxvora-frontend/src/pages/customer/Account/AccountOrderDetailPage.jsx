import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiArrowLeft, FiTruck, FiCreditCard, FiPackage } from 'react-icons/fi';
import OrderStatus from '@components/account/OrderStatus';
import Price from '@components/common/Price/Price';
import { selectOrderById } from '@store/slices/orderSlice';
import { getOrderById } from './accountOrdersData';

const AccountOrderDetailPage = () => {
  const { orderId } = useParams();
  const placedOrder = useSelector(selectOrderById(orderId));
  const order = placedOrder || getOrderById(orderId);

  if (!order) {
    return (
      <section className="card p-12 text-center">
        <h2 className="text-xl font-secondary font-bold text-primary mb-2">Order not found</h2>
        <p className="text-secondary mb-6">We could not find that order in your history.</p>
        <Link to="/account/orders" className="btn btn-primary">
          Back to Orders
        </Link>
      </section>
    );
  }

  return (
    <section aria-labelledby="order-detail-heading">
      <Link
        to="/account/orders"
        className="inline-flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors mb-6"
      >
        <FiArrowLeft className="w-4 h-4" aria-hidden="true" />
        Back to orders
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 id="order-detail-heading" className="text-xl font-secondary font-bold text-primary">
            Order #{order.orderNumber}
          </h2>
          <p className="text-sm text-secondary mt-1">
            Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { dateStyle: 'long' })}
          </p>
        </div>
        <Price current={order.total} className="text-2xl font-bold" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6 min-w-0">
          <div className="card p-6">
            <h3 className="font-semibold text-primary mb-4">Items</h3>
            <ul className="space-y-4" role="list">
              {order.items.map((item) => (
                <li key={item.id} className="flex items-center gap-4">
                  <Link
                    to={`/product/${item.slug}`}
                    className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-100 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <FiPackage className="w-6 h-6 text-neutral-400" />
                    )}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.slug}`}
                      className="font-medium text-primary hover:text-secondary truncate block"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-secondary">Qty: {item.quantity}</p>
                  </div>
                  <Price current={item.price * item.quantity} className="font-medium" />
                </li>
              ))}
            </ul>

            <dl className="mt-6 pt-6 border-t space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-secondary">Subtotal</dt>
                <dd><Price current={order.subtotal} /></dd>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between">
                  <dt className="text-secondary">Discount</dt>
                  <dd className="text-success">−<Price current={order.discount} /></dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-secondary">Shipping</dt>
                <dd>{order.shipping === 0 ? 'Free' : <Price current={order.shipping} />}</dd>
              </div>
              <div className="flex justify-between pt-2 border-t font-semibold text-primary">
                <dt>Total</dt>
                <dd><Price current={order.total} /></dd>
              </div>
            </dl>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold text-primary mb-6">Status</h3>
            <OrderStatus status={order.status} timeline={order.timeline} />
          </div>
        </div>

        <aside className="space-y-6 min-w-0">
          <div className="card p-6">
            <h3 className="font-semibold text-primary mb-4">Delivery</h3>
            <p className="flex items-center gap-2 text-sm text-secondary">
              <FiTruck className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              {order.shippingMethod}
            </p>
            {order.customer && (order.customer.email || order.customer.phone) && (
              <address className="mt-3 not-italic text-sm text-secondary leading-relaxed">
                {[order.customer.firstName, order.customer.lastName].filter(Boolean).join(' ')}
                {order.customer.email && (
                  <span className="block">{order.customer.email}</span>
                )}
                {order.customer.phone && <span className="block">{order.customer.phone}</span>}
              </address>
            )}
          </div>

          <div className="card p-6">
            <h3 className="font-semibold text-primary mb-4">Payment</h3>
            <p className="flex items-center gap-2 text-sm text-secondary">
              <FiCreditCard className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              {order.paymentMethod}
            </p>
          </div>

          <Link to="/shop" className="btn btn-outline w-full">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </section>
  );
};

export default AccountOrderDetailPage;
