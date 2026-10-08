import { FiHome, FiTrash2, FiMapPin } from 'react-icons/fi';

/**
 * AddressCard — displays a saved delivery address.
 *
 * Props:
 *   address      {object}   — address data object
 *   isDefault    {boolean}  — whether this is the default address
 *   onSetDefault {function} — called with address.id to make it the default
 *   onDelete     {function} — called with address.id to remove it
 */
const AddressCard = ({ address, isDefault, onSetDefault, onDelete }) => {
    const lines = [
        address.address1,
        address.address2,
        [address.city, address.state, address.postalCode].filter(Boolean).join(', '),
        address.country,
    ].filter(Boolean);

    return (
        <article
            className={`card p-6 flex flex-col gap-4 ${isDefault ? 'ring-2 ring-secondary' : ''}`}
            aria-label={`Address for ${address.firstName} ${address.lastName}`}
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                        <FiMapPin className="w-4 h-4 text-secondary" aria-hidden="true" />
                    </span>
                    <div>
                        <p className="font-semibold text-primary text-sm">
                            {[address.firstName, address.lastName].filter(Boolean).join(' ')}
                        </p>
                        {address.company && (
                            <p className="text-xs text-secondary">{address.company}</p>
                        )}
                    </div>
                </div>

                {isDefault && (
                    <span className="badge badge-primary badge-sm flex-shrink-0">Default</span>
                )}
            </div>

            {/* Address lines */}
            <address className="not-italic text-sm text-secondary leading-relaxed">
                {lines.map((line, i) => (
                    <span key={i} className="block">{line}</span>
                ))}
                {address.phone && <span className="block mt-1">{address.phone}</span>}
            </address>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2 border-t border-neutral-100 mt-auto">
                {!isDefault && (
                    <button
                        type="button"
                        className="btn btn-outline btn-sm flex items-center gap-1.5"
                        onClick={() => onSetDefault?.(address.id)}
                    >
                        <FiHome className="w-3.5 h-3.5" aria-hidden="true" />
                        Set as Default
                    </button>
                )}
                <button
                    type="button"
                    className="btn btn-ghost btn-icon-sm text-error hover:text-error ml-auto"
                    onClick={() => onDelete?.(address.id)}
                    aria-label={`Remove address on ${address.address1}`}
                >
                    <FiTrash2 className="w-4 h-4" aria-hidden="true" />
                </button>
            </div>
        </article>
    );
};

export default AddressCard;
