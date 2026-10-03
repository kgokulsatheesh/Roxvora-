import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import AddressCard from '@components/account/AddressCard';

const INITIAL_ADDRESSES = [
  {
    id: 'addr_1',
    firstName: 'Aditi',
    lastName: 'Sharma',
    address1: '12 Palm Grove',
    address2: 'Apartment 4B',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560001',
    country: 'India',
    phone: '+91 98765 43210',
    isDefault: true,
  },
  {
    id: 'addr_2',
    firstName: 'Aditi',
    lastName: 'Sharma',
    company: 'ROXVORA Studio',
    address1: '44 Linking Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400050',
    country: 'India',
    phone: '+91 98765 43210',
    isDefault: false,
  },
];

const AccountAddressesPage = () => {
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);

  const handleSetDefault = (id) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
    toast.success('Default delivery address updated');
  };

  const handleDelete = (id) => {
    setAddresses((prev) => {
      const remaining = prev.filter((a) => a.id !== id);
      // Never leave the account without a default address.
      if (prev.find((a) => a.id === id)?.isDefault && remaining.length) {
        remaining[0] = { ...remaining[0], isDefault: true };
      }
      return remaining;
    });
    toast.success('Address removed');
  };

  return (
    <section aria-labelledby="addresses-heading">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 id="addresses-heading" className="text-xl font-secondary font-bold text-primary">
          Saved Addresses
        </h2>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => toast('Address creation requires a backend')}>
          <FiPlus className="w-4 h-4" aria-hidden="true" />
          Add Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="card p-12 text-center">
          <h3 className="text-lg font-semibold text-primary mb-2">No saved addresses</h3>
          <p className="text-secondary">Add an address to speed up your next checkout.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              isDefault={address.isDefault}
              onSetDefault={handleSetDefault}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default AccountAddressesPage;