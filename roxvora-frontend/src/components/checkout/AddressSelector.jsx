// AddressSelector — lets users pick a saved address during checkout.
const AddressSelector = ({ addresses = [], selectedId, onSelect }) => {
    if (addresses.length === 0) return null;
    return (
        <div className="space-y-3" role="radiogroup" aria-label="Select delivery address">
            {addresses.map((addr) => (
                <label
                    key={addr.id}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${selectedId === addr.id ? 'border-secondary bg-secondary/5' : 'border-neutral-200 hover:border-neutral-300'}`}
                >
                    <input type="radio" name="address" value={addr.id} checked={selectedId === addr.id} onChange={() => onSelect?.(addr.id)} className="mt-1" />
                    <address className="not-italic text-sm text-secondary">
                        <p className="font-medium text-primary">{[addr.firstName, addr.lastName].filter(Boolean).join(' ')}</p>
                        {addr.address1 && <span className="block">{addr.address1}</span>}
                        {addr.address2 && <span className="block">{addr.address2}</span>}
                        <span className="block">{[addr.city, addr.state, addr.postalCode].filter(Boolean).join(', ')}</span>
                    </address>
                </label>
            ))}
        </div>
    );
};

export default AddressSelector;
