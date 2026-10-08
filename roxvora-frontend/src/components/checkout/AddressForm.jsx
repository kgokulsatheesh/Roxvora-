// AddressForm — reusable address entry form used in checkout and account.
const AddressForm = ({ values = {}, onChange, className = '' }) => {
    const set = (field) => (e) => onChange?.({ ...values, [field]: e.target.value });
    const field = (id, label, type = 'text') => (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-primary mb-1.5">{label}</label>
            <input id={id} type={type} value={values[id] ?? ''} onChange={set(id)} className="input-field w-full" />
        </div>
    );
    return (
        <div className={`grid sm:grid-cols-2 gap-4 ${className}`}>
            {field('firstName', 'First Name')}
            {field('lastName', 'Last Name')}
            {field('address1', 'Address Line 1')}
            {field('address2', 'Address Line 2 (optional)')}
            {field('city', 'City')}
            {field('state', 'State')}
            {field('postalCode', 'Postal Code')}
            {field('phone', 'Phone', 'tel')}
        </div>
    );
};

export default AddressForm;
