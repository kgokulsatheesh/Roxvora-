import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FiSearch } from 'react-icons/fi';
import { selectOrders } from '../../../store/slices/orderSlice';
import { formatCurrency } from '../../../utils/formatCurrency';

const STATUS_STYLES = {
    pending: 'bg-yellow-50 text-yellow-700 ring-yellow-200',
    confirmed: 'bg-blue-50 text-blue-700 ring-blue-200',
    processing: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
    shipped: 'bg-purple-50 text-purple-700 ring-purple-200',
    delivered: 'bg-green-50 text-green-700 ring-green-200',
    cancelled: 'bg-red-50 text-red-700 ring-red-200',
};

const OrdersPage = () => {
    const orders = useSelector(selectOrders);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filtered = orders.filter((order) => {
        const matchesSearch =
            !search.trim() ||
            order.orderNumber?.toLowerCase().includes(search.toLowerCase()) ||
            order.customer?.email?.toLowerCase().includes(search.toLowerCase());

        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-3xl font-secondary font-bold text-primary">Orders</h1>
                <p className="text-sm text-secondary">{orders.length} total order{orders.length !== 1 ? 's' : ''}</p>
            </div>

            <div className="card">
                <div className="p-4 border-b flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1 max-w-sm">
                        <FiSearch
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
                            aria-hidden="true"
                        />
                        <input
                            type="search"
                            placeholder="Search by order # or email…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input-field w-full pl-9 input-field-sm"
                            aria-label="Search orders"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="input-field input-field-sm w-40"
                        aria-label="Filter by status"
                    >
                        <option value="all">All statuses</option>
                        {Object.keys(STATUS_STYLES).map((s) => (
                            <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                        ))}
                    </select>
                </div>

                {filtered.length === 0 ? (
                    <div className="p-12 text-center text-secondary">
                        <p>{orders.length === 0 ? 'No orders placed yet.' : 'No orders match your filters.'}</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm" aria-label="Orders">
                            <thead>
                                <tr className="text-left text-secondary border-b">
                                    <th className="px-4 py-3 font-medium">Order</th>
                                    <th className="px-4 py-3 font-medium">Date</th>
                                    <th className="px-4 py-3 font-medium">Customer</th>
                                    <th className="px-4 py-3 font-medium">Items</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                    <th className="px-4 py-3 font-medium text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                                {filtered.map((order) => {
                                    const styleClass = STATUS_STYLES[order.status] ?? STATUS_STYLES.confirmed;
                                    return (
                                        <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                                            <td className="px-4 py-3 font-medium text-primary">{order.orderNumber}</td>
                                            <td className="px-4 py-3 text-secondary">
                                                {new Date(order.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                                            </td>
                                            <td className="px-4 py-3 text-secondary">
                                                {order.customer?.email ||
                                                    [order.customer?.firstName, order.customer?.lastName].filter(Boolean).join(' ') ||
                                                    '—'}
                                            </td>
                                            <td className="px-4 py-3 text-secondary">{order.itemCount ?? order.items?.length ?? 0}</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ring-1 capitalize ${styleClass}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right font-medium text-primary">
                                                {formatCurrency(order.total)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;
