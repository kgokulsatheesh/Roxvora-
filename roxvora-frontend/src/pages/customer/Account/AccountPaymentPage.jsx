import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiPlus, FiTrash2, FiCreditCard } from 'react-icons/fi';

const INITIAL_METHODS = [
  { id: 'pm_1', brand: 'Visa', last4: '4242', expiry: '04/28', isDefault: true },
  { id: 'pm_2', brand: 'UPI', handle: 'aditi@okaxis', isDefault: false },
];

const AccountPaymentPage = () => {
  const [methods, setMethods] = useState(INITIAL_METHODS);

  const handleDelete = (id) => {
    setMethods((prev) => {
      const remaining = prev.filter((m) => m.id !== id);
      if (prev.find((m) => m.id === id)?.isDefault && remaining.length) {
        remaining[0] = { ...remaining[0], isDefault: true };
      }
      return remaining;
    });
    toast.success('Payment method removed');
  };

  return (
    <section aria-labelledby="payment-heading">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 id="payment-heading" className="text-xl font-secondary font-bold text-primary">
          Payment Methods
        </h2>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => toast('Adding cards requires a payment provider')}>
          <FiPlus className="w-4 h-4" aria-hidden="true" />
          Add Method
        </button>
      </div>

      {methods.length === 0 ? (
        <div className="card p-12 text-center">
          <h3 className="text-lg font-semibold text-primary mb-2">No payment methods saved</h3>
          <p className="text-secondary">Add a card or UPI ID for faster checkout.</p>
        </div>
      ) : (
        <ul className="space-y-4" role="list">
          {methods.map((method) => (
            <li key={method.id} className="card p-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="w-11 h-11 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <FiCreditCard className="w-5 h-5 text-secondary" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-medium text-primary">
                    {method.brand}
                    {method.last4 ? ` **** ${method.last4}` : ` · ${method.handle}`}
                  </p>
                  {method.expiry && <p className="text-sm text-secondary">Expires {method.expiry}</p>}
                </div>
                {method.isDefault && <span className="badge badge-primary badge-sm">Default</span>}
              </div>

              <button
                type="button"
                className="btn btn-ghost btn-icon-sm text-error hover:text-error"
                onClick={() => handleDelete(method.id)}
                aria-label={`Remove ${method.brand} payment method`}
              >
                <FiTrash2 className="w-5 h-5" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default AccountPaymentPage;