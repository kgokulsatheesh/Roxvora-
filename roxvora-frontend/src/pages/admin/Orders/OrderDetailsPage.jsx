
const OrdersPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-secondary font-bold text-primary">Orders</h1>

      <div className="card">
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4">
          <div className="flex gap-2">
            <select className="input-field input-field-sm w-40">
              <option>All Status</option>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-secondary border-b">
                <th className="pb-3 font-medium">Order #</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Total</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {[
                { id: 'ORD-001', customer: 'John Doe', date: '2024-01-15', status: 'delivered', total: 149.99 },
                { id: 'ORD-002', customer: 'Jane Smith', date: '2024-01-14', status: 'shipped', total: 89.99 },
                { id: 'ORD-003', customer: 'Bob Wilson', date: '2024-01-13', status: 'processing', total: 299.99 },
              ].map((order) => (
                <tr key={order.id} className="hover:bg-neutral-50">
                  <td className="py-4 font-mono font-medium text-primary">{order.id}</td>
                  <td className="py-4">{order.customer}</td>
                  <td className="py-4 text-secondary">{order.date}</td>
                  <td className="py-4">
                    <span className={`badge badge-${order.status === 'delivered' ? 'success' : order.status === 'shipped' ? 'secondary' : 'primary'} badge-sm`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 text-right font-medium text-primary">${order.total.toFixed(2)}</td>
                  <td className="py-4">
                    <button className="btn btn-ghost btn-icon-sm">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;