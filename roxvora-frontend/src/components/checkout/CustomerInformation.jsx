import { useState } from 'react';

const CustomerInformation = ({ onSubmit, onBack, defaultValues = {} }) => {
    const [values, setValues] = useState({
        firstName: defaultValues.firstName ?? '',
        lastName: defaultValues.lastName ?? '',
        email: defaultValues.email ?? '',
        phone: defaultValues.phone ?? '',
        address: defaultValues.address ?? '',
        city: defaultValues.city ?? '',
        state: defaultValues.state ?? '',
        postalCode: defaultValues.postalCode ?? '',
        country: defaultValues.country ?? 'India',
    });
    const [error, setError] = useState('');
    const set = (field) => (e) => setValues((p) => ({ ...p, [field]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        const required = ['firstName', 'email', 'address', 'city', 'postalCode'];
        if (required.some((f) => !values[f])) { setError('Please fill in all required fields'); return; }
        setError('');
        onSubmit?.(values);
    };

    const field = (id, label, type = 'text', required = false, span = 1) => (
        <div className={span === 2 ? 'sm:col-span-2' : ''}>
            <label htmlFor={id} className="block text-sm font-medium text-primary mb-1.5">{label}{required && ' *'}</label>
            <input id={id} type={type} value={values[id]} onChange={set(id)} className="input-field w-full" autoComplete={id} required={required} />
        </div>
    );

    return (
        <form onSubmit={handleSubmit} noValidate>
            <h2 className="text-lg font-semibold text-primary mb-6">Shipping Information</h2>
            {error && <p role="alert" className="text-sm text-error mb-4">{error}</p>}

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {field('firstName', 'First Name', 'text', true)}
                {field('lastName', 'Last Name')}
                {field('email', 'Email', 'email', true, 2)}
                {field('phone', 'Phone', 'tel')}
                {field('address', 'Address', 'text', true, 2)}
                {field('city', 'City', 'text', true)}
                {field('state', 'State')}
                {field('postalCode', 'Postal Code', 'text', true)}
                <div>
                    <label htmlFor="country" className="block text-sm font-medium text-primary mb-1.5">Country</label>
                    <select id="country" value={values.country} onChange={set('country')} className="input-field w-full">
                        <option value="India">India</option>
                        <option value="USA">United States</option>
                        <option value="UK">United Kingdom</option>
                    </select>
                </div>
            </div>

            <div className="flex gap-3">
                <button type="button" className="btn btn-outline btn-md" onClick={onBack}>Back</button>
                <button type="submit" className="btn btn-primary btn-md flex-1">Continue to Shipping</button>
            </div>
        </form>
    );
};

export default CustomerInformation;
