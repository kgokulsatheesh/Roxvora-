import { Link } from 'react-router-dom';

const AuthLayout = ({ title, subtitle, children }) => (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <Link to="/" className="inline-block text-2xl font-secondary font-bold tracking-[0.15em] text-primary mb-6">
                    ROXVORA
                </Link>
                <h1 className="text-2xl font-secondary font-bold text-primary">{title}</h1>
                {subtitle && <p className="text-secondary mt-2">{subtitle}</p>}
            </div>
            <div className="card p-8">{children}</div>
        </div>
    </div>
);

export default AuthLayout;
