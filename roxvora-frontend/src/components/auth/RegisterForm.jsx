import { useState } from 'react';

const RegisterForm = ({ onSubmit, isSubmitting, onSwitchToLogin }) => {
    const [values, setValues] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [error, setError] = useState('');
    const set = (field) => (e) => setValues((p) => ({ ...p, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!values.firstName || !values.email || !values.password) { setError('Please fill in all required fields'); return; }
        if (values.password.length < 8) { setError('Password must be at least 8 characters'); return; }
        try { await onSubmit?.(values); } catch (err) { setError(err?.message || 'Registration failed'); }
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {error && <p role="alert" className="text-sm text-error bg-error/10 px-3 py-2 rounded-lg">{error}</p>}

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="reg-first" className="block text-sm font-medium text-primary mb-1.5">First Name *</label>
                    <input id="reg-first" type="text" value={values.firstName} onChange={set('firstName')} className="input-field w-full" autoComplete="given-name" required />
                </div>
                <div>
                    <label htmlFor="reg-last" className="block text-sm font-medium text-primary mb-1.5">Last Name</label>
                    <input id="reg-last" type="text" value={values.lastName} onChange={set('lastName')} className="input-field w-full" autoComplete="family-name" />
                </div>
            </div>

            <div>
                <label htmlFor="reg-email" className="block text-sm font-medium text-primary mb-1.5">Email *</label>
                <input id="reg-email" type="email" value={values.email} onChange={set('email')} className="input-field w-full" autoComplete="email" required placeholder="you@example.com" />
            </div>

            <div>
                <label htmlFor="reg-password" className="block text-sm font-medium text-primary mb-1.5">Password *</label>
                <input id="reg-password" type="password" value={values.password} onChange={set('password')} className="input-field w-full" autoComplete="new-password" required placeholder="Min. 8 characters" />
            </div>

            <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-full mt-2">
                {isSubmitting ? 'Creating account…' : 'Create Account'}
            </button>

            <p className="text-center text-sm text-secondary">
                Already have an account?{' '}
                <button type="button" className="text-primary font-medium hover:underline" onClick={onSwitchToLogin}>Sign in</button>
            </p>
        </form>
    );
};

export default RegisterForm;
