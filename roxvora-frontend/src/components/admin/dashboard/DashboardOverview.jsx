import { useSelector } from 'react-redux';
import { FiShoppingBag, FiUsers, FiPackage, FiTrendingUp } from 'react-icons/fi';
import { selectProducts } from '../../../store/slices/productSlice';
import { selectOrders } from '../../../store/slices/orderSlice';
import { formatCurrency } from '../../../utils/formatCurrency';

const StatCard = ({ icon: Icon, label, value, change, changeLabel }) => (
    <div className="card p-6">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm text-secondary mb-1">{label}</p>
                <p className="text-2xl font-secondary font-bold text-primary">{value}</p>
                {change !== undefined && (
                    <p className={`text-xs mt-1 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% {changeLabel}
                    </p>
                )}
            </div>
            <span className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-secondary" aria-hidden="true" />
            </span>
        </div>
    </div>
);

const DashboardOverview = () => {
    const products = useSelector(selectProducts);
    const orders = useSelector(selectOrders);

    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const activeProducts = products.filter((p) => p.stock > 0).length;

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard
                    icon={FiTrendingUp}
                    label="Total Revenue"
                    value={formatCurrency(totalRevenue)}
                    change={12}
                    changeLabel="vs last month"
                />
                <StatCard
                    icon={FiShoppingBag}
                    label="Total Orders"
                    value={orders.length}
                    change={8}
                    changeLabel="vs last month"
                />
                <StatCard
                    icon={FiPackage}
                    label="Active Products"
                    value={activeProducts}
                    change={3}
                    changeLabel="new this week"
                />
                <StatCard
                    icon={FiUsers}
                    label="Customers"
                    value="1,284"
                    change={5}
                    changeLabel="new this month"
                />
            </div>

            {/* Recent orders */}
            <div className="card">
                <div className="p-4 border-b">
                    <h2 className="font-semibold text-primary">Recent Orders</h2>
                </div>
                {orders.length === 0 ? (
                    <div className="p-12 text-center text-secondary">
                        <FiShoppingBag className="w-8 h-8 mx-auto mb-3 text-neutral-300" aria-hidden="true" />
                        <p>No orders placed yet.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-secondary border-b">
                                    <th className="px-4 py-3 font-medium">Order</th>
                                    <th className="px-4 py-3 font-medium">Date</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                    <th className="px-4 py-3 font-medium text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                                {orders.slice(0, 5).map((order) => (
                                    <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                                        <td className="px-4 py-3 font-medium text-primary">{order.orderNumber}</td>
                                        <td className="px-4 py-3 text-secondary">
                                            {new Date(order.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="badge badge-sm badge-primary capitalize">{order.status}</span>
                                        </td>
                                        <td className="px-4 py-3 text-right font-medium text-primary">
                                            {formatCurrency(order.total)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Low stock warning */}
            {products.some((p) => p.stock > 0 && p.stock <= 5) && (
                <div className="card">
                    <div className="p-4 border-b">
                        <h2 className="font-semibold text-primary">Low Stock Alert</h2>
                    </div>
                    <ul className="divide-y divide-neutral-100">
                        {products
                            .filter((p) => p.stock > 0 && p.stock <= 5)
                            .map((p) => (
                                <li key={p.id} className="px-4 py-3 flex items-center justify-between gap-4">
                                    <span className="text-sm font-medium text-primary truncate">{p.name}</span>
                                    <span className="text-sm text-red-600 font-semibold flex-shrink-0">
                                        {p.stock} left
                                    </span>
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DashboardOverview;
