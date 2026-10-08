import { Link } from 'react-router-dom';
import { FiPackage, FiChevronRight } from 'react-icons/fi';
import { formatCurrency } from '../../utils/formatCurrency';

const STATUS_STYLES = {
    pending: { label: 'Pending', classes: 'bg-yellow-50 text-yellow-700 ring-yellow-200' },
    confirmed: { label: 'Confirmed', classes: 'bg-blue-50 text-blue-700 ring-blue-200' },
    processing: { label: 'Processing', classes: 'bg-indigo-50 text-indigo-700 ring-indigo-200' },
    shipped: { label: 'Shipped', classes: 'bg-purple-50 text-purple-700 ring-purple-200' },
    delivered: { label: 'Delivered', classes: 'bg-green-50 text-green-700 ring-green-200' },
    cancelled: { label: 'Cancelled', classes: 'bg-red-50 text-red-700 ring-red-200' },
};

/**
 * OrderCard — summary card shown in the order history list.
 *
 * Props:
 *   order {object} — a single order object from the orders list
 */
const OrderCard = ({ order }) => {
    const statusStyle = STATUS_STYLES[order.status] ?? STATUS_STYLES.confirmed;
    const previewItems = order.items?.slice(0, 3) ?? [];
    const remaining = (order.items?.length ?? 0) - previewItems.length;

    return (
        <article className="card p-5 sm:p-6" aria-label={`Order ${order.orderNumber}`}>
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div className="min-w-0">
                    <p className="text-xs text-secondary uppercase tracking-wider mb-1">Order</p>
                    <p className="font-semibold text-primary">{order.orderNumber}</p>
                    <p className="text-sm text-secondary mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', { dateStyle: 'long' })}
                    </p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                    <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ${statusStyle.classes}`}
                    >
                        {statusStyle.label}
                    </span>
                    <span className="font-semibold text-primary text-sm">
                        {formatCurrency(order.total)}
                    </span>
                </div>
            </div>

            {/* Item previews */}
            {previewItems.length > 0 && (
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                    {previewItems.map((item) => (
                        <div
                            key={item.id}
                            className="w-14 h-14 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0"
                        >
                            {item.image ? (
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <FiPackage className="w-5 h-5 text-neutral-400" aria-hidden="true" />
                                </div>
                            )}
                        </div>
                    ))}
                    {remaining > 0 && (
                        <span className="text-sm text-secondary">+{remaining} more</span>
                    )}
                </div>
            )}

            <div className="flex items-center justify-between gap-4 pt-3 border-t border-neutral-100">
                <p className="text-sm text-secondary">
                    {order.itemCount ?? order.items?.length ?? 0} item
                    {(order.itemCount ?? order.items?.length ?? 0) !== 1 ? 's' : ''}
                    {order.shippingMethod ? ` · ${order.shippingMethod}` : ''}
                </p>

                <Link
                    to={`/account/orders/${order.id}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-secondary hover:text-primary transition-colors"
                >
                    View Details
                    <FiChevronRight className="w-4 h-4" aria-hidden="true" />
                </Link>
            </div>
        </article>
    );
};

export default OrderCard;
