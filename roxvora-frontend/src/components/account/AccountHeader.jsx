import { Link } from 'react-router-dom';
import { FiUser, FiLogOut, FiChevronRight } from 'react-icons/fi';

/**
 * AccountHeader — top banner shown on all account pages.
 *
 * Props:
 *   user      {object|null} — the authenticated user object from Redux
 *   onSignOut {function}    — called when the sign-out button is clicked
 */
const AccountHeader = ({ user, onSignOut }) => {
    const displayName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || user?.name || 'My Account';
    const initials = displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <header className="bg-primary-900 text-white" role="banner">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 md:py-12">
                <nav className="flex items-center gap-2 text-sm text-white/60 mb-6" aria-label="Breadcrumb">
                    <Link to="/" className="hover:text-secondary transition-colors">
                        Home
                    </Link>
                    <FiChevronRight className="w-4 h-4" aria-hidden="true" />
                    <span className="text-white">My Account</span>
                </nav>

                <div className="flex flex-wrap items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div
                            className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 text-white font-secondary font-bold text-lg"
                            aria-hidden="true"
                        >
                            {initials || <FiUser className="w-7 h-7" />}
                        </div>

                        <div>
                            <p className="text-xl font-secondary font-semibold text-white">
                                {displayName}
                            </p>
                            {user?.email && (
                                <p className="text-sm text-white/60 mt-0.5">{user.email}</p>
                            )}
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onSignOut}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-white/80 hover:text-white hover:border-white/50 transition-colors text-sm font-medium"
                    >
                        <FiLogOut className="w-4 h-4" aria-hidden="true" />
                        Sign Out
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AccountHeader;
