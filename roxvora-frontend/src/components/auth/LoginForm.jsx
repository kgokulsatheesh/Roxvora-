import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = ({ onSubmit, isSubmitting, onForgotPassword, onSwitchToRegister }) => {
    const [values, setValues] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!values.email || !values.password) { setError('Please fill in all fields'); return; }
        try { await onSubmit?.(values); } catch (err) { setError(err?.message || 'Login failed'); }
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {error && <p role="alert" className="text-sm text-error bg-error/10 px-3 py-2 rounded-lg">{error}</p>}

            <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-primary mb-1.5">Email</label>
                <input id="login-email" type="email" value={values.email} onChange={(e) => setValues((p) => ({ ...p, email: e.target.value }))} className="input-field w-full" autoComplete="email" required placeholder="you@example.com" />
            </div>

            <div>
                <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="login-password" className="text-sm font-medium text-primary">Password</label>
                    <button type="button" className="text-xs text-secondary hover:text-primary transition-colors" onClick={onForgotPassword}>Forgot password?</button>
                </div>
                <input id="login-password" type="password" value={values.password} onChange={(e) => setValues((p) => ({ ...p, password: e.target.value }))} className="input-field w-full" autoComplete="current-password" required />
            </div>

            <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-full mt-2">
                {isSubmitting ? 'Signing in…' : 'Sign In'}
            </button>

            <p className="text-center text-sm text-secondary">
                Don't have an account?{' '}
                <button type="button" className="text-primary font-medium hover:underline" onClick={onSwitchToRegister}>Create account</button>
            </p>
        </form>
    );
};

export default LoginForm;
