import { NavLink } from 'react-router-dom';
import {
    FiUser,
    FiPackage,
    FiMapPin,
    FiCreditCard,
    FiSettings,
} from 'react-icons/fi';

const NAV_ITEMS = [
    { label: 'Profile', href: '/account', icon: FiUser, end: true },
    { label: 'Order History', href: '/account/orders', icon: FiPackage },
    { label: 'Addresses', href: '/account/addresses', icon: FiMapPin },
    { label: 'Payment Methods', href: '/account/payment', icon: FiCreditCard },
    { label: 'Preferences', href: '/account/settings', icon: FiSettings },
];

/**
 * AccountSidebar — left-hand navigation panel for account pages.
 *
 * Props:
 *   className {string} — extra wrapper class names
 */
const AccountSidebar = ({ className = '' }) => {
    return (
        <aside
            className={`w-full lg:w-56 xl:w-64 ${className}`}
            aria-label="Account navigation"
        >
            <nav>
                <ul className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0" role="list">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.href} role="none" className="flex-shrink-0 lg:flex-shrink">
                                <NavLink
                                    to={item.href}
                                    end={item.end}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
                    ${isActive
                                            ? 'bg-primary-50 text-secondary'
                                            : 'text-neutral-600 hover:bg-neutral-100 hover:text-primary'
                                        }`
                                    }
                                    aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
                                >
                                    <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                                    {item.label}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default AccountSidebar;
