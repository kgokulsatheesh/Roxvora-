import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiFilter, FiSearch, FiTruck, FiX } from 'react-icons/fi';
// import OrderCard from '@components/account/OrderCard';
import OrderCard from "../../../components/account/OrderCard";
// import { selectOrders } from '@store/slices/orderSlice';
import { selectOrders } from '../../../store/slices/orderSlice';
import { ACCOUNT_ORDERS } from './accountOrdersData';

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
];

const AccountOrdersPage = () => {
  const placedOrders = useSelector(selectOrders);
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');

  // Newly placed orders first, then the seeded account history.
  const allOrders = useMemo(
    () => [...placedOrders, ...ACCOUNT_ORDERS],
    [placedOrders]
  );

  const counts = useMemo(
    () =>
      allOrders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {}),
    [allOrders]
  );

  const orders = useMemo(() => {
    const term = query.trim().toLowerCase();
    return allOrders.filter((order) => {
      const matchesStatus = status === 'all' || order.status === status;
      const matchesTerm =
        !term ||
        order.orderNumber?.toLowerCase().includes(term) ||
        order.items?.some((item) => item.name.toLowerCase().includes(term));
      return matchesStatus && matchesTerm;
    });
  }, [allOrders, status, query]);

  const activeOrders = allOrders.filter(
    (order) => !['delivered', 'cancelled'].includes(order.status)
  ).length;

  return (
    <section aria-labelledby="orders-heading">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 id="orders-heading" className="text-xl font-secondary font-bold text-primary">
            Order History
          </h2>
          <p className="text-sm text-secondary mt-1">
            {allOrders.length} order{allOrders.length !== 1 ? 's' : ''} placed
            {activeOrders > 0 ? ` · ${activeOrders} on the way` : ''}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-52">
            <label htmlFor="order-search" className="sr-only">
              Search orders by number or product
            </label>
            <FiSearch
              className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="order-search"
              type="search"
              className="input-field input-field-sm w-full pl-9"
              placeholder="Search orders"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <FiFilter className="w-4 h-4 text-secondary shrink-0" aria-hidden="true" />
          <label htmlFor="order-status" className="sr-only">
            Filter orders by status
          </label>
          <select
            id="order-status"
            className="input-field input-field-sm w-36 sm:w-40 shrink-0"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {FILTERS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
                {counts[f.value] ? ` (${counts[f.value]})` : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="card p-12 text-center">
          <FiTruck className="w-10 h-10 text-secondary mx-auto mb-4" aria-hidden="true" />
          <h3 className="text-lg font-semibold text-primary mb-2">
            {allOrders.length === 0 ? 'No orders yet' : 'No matching orders'}
          </h3>
          <p className="text-secondary mb-6">
            {allOrders.length === 0
              ? 'Once you place an order it will appear here with its status and tracking.'
              : 'Try a different status or clear your search.'}
          </p>
          {allOrders.length === 0 ? (
            <Link to="/shop" className="btn btn-primary">
              Start Shopping
            </Link>
          ) : (
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setStatus('all');
                setQuery('');
              }}
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {status !== 'all' && (
            <button
              type="button"
              onClick={() => setStatus('all')}
              className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-primary transition-colors"
            >
              Showing {FILTERS.find((f) => f.value === status)?.label} orders
              <FiX className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </section>
  );
};

export default AccountOrdersPage;
