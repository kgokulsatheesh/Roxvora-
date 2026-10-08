import { useState } from 'react';

const ForgotPasswordForm = ({ onSubmit, isSubmitting, onBackToLogin }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!email) { setError('Please enter your email address'); return; }
        try { await onSubmit?.({ email }); } catch (err) { setError(err?.message || 'Something went wrong'); }
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {error && <p role="alert" className="text-sm text-error bg-error/10 px-3 py-2 rounded-lg">{error}</p>}

            <div>
                <label htmlFor="forgot-email" className="block text-sm font-medium text-primary mb-1.5">Email Address</label>
                <input id="forgot-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field w-full" autoComplete="email" required placeholder="you@example.com" />
            </div>

            <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-full">
                {isSubmitting ? 'Sending…' : 'Send Reset Link'}
            </button>

            <button type="button" className="btn btn-ghost btn-full text-secondary" onClick={onBackToLogin}>
                Back to Sign In
            </button>
        </form>
    );
};

export default ForgotPasswordForm;
