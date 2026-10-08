import { useState } from 'react';

const ResetPasswordForm = ({ onSubmit, isSubmitting, onBackToLogin }) => {
    const [values, setValues] = useState({ password: '', confirm: '' });
    const [error, setError] = useState('');
    const set = (field) => (e) => setValues((p) => ({ ...p, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!values.password) { setError('Please enter a new password'); return; }
        if (values.password.length < 8) { setError('Password must be at least 8 characters'); return; }
        if (values.password !== values.confirm) { setError('Passwords do not match'); return; }
        try { await onSubmit?.(values); } catch (err) { setError(err?.message || 'Something went wrong'); }
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {error && <p role="alert" className="text-sm text-error bg-error/10 px-3 py-2 rounded-lg">{error}</p>}

            <div>
                <label htmlFor="reset-password" className="block text-sm font-medium text-primary mb-1.5">New Password</label>
                <input id="reset-password" type="password" value={values.password} onChange={set('password')} className="input-field w-full" autoComplete="new-password" required placeholder="Min. 8 characters" />
            </div>

            <div>
                <label htmlFor="reset-confirm" className="block text-sm font-medium text-primary mb-1.5">Confirm Password</label>
                <input id="reset-confirm" type="password" value={values.confirm} onChange={set('confirm')} className="input-field w-full" autoComplete="new-password" required />
            </div>

            <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-full">
                {isSubmitting ? 'Updating…' : 'Update Password'}
            </button>

            <button type="button" className="btn btn-ghost btn-full text-secondary" onClick={onBackToLogin}>
                Back to Sign In
            </button>
        </form>
    );
};

export default ResetPasswordForm;
