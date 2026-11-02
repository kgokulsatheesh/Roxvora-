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

/* ─── Active / idle link colours ────────────────────────── */
const ACTIVE_BG = '#fdf6ee';
const ACTIVE_COLOR = '#b8934a';
const IDLE_COLOR = '#404040';
const HOVER_BG = '#f5f5f5';

const linkBase = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    transition: 'background 0.15s, color 0.15s',
    width: '100%',
    boxSizing: 'border-box',
};

const AccountSidebar = () => {
    return (
        <aside aria-label="Account navigation" className="account-sidebar">
            <nav>
                <ul
                    className="account-sidebar-nav"
                    role="list"
                    style={{
                        listStyle: 'none',
                        margin: 0,
                        padding: 0,
                    }}
                >
                    {NAV_ITEMS.map(({ href, label, icon: Icon, end }) => (
                        <li key={href} role="none">
                            <NavLink
                                to={href}
                                end={end}
                                style={({ isActive }) => ({
                                    ...linkBase,
                                    backgroundColor: isActive ? ACTIVE_BG : 'transparent',
                                    color: isActive ? ACTIVE_COLOR : IDLE_COLOR,
                                })}
                                onMouseEnter={(e) => {
                                    if (e.currentTarget.getAttribute('aria-current') !== 'page') {
                                        e.currentTarget.style.backgroundColor = HOVER_BG;
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (e.currentTarget.getAttribute('aria-current') !== 'page') {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }
                                }}
                                aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
                            >
                                <Icon
                                    style={{ width: 16, height: 16, flexShrink: 0 }}
                                    aria-hidden="true"
                                />
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/*
        Responsive rules for the sidebar nav:

        Mobile  (< 1024px):
          - Nav items sit in a HORIZONTAL scrollable row (pill strip under the header).
          - The aside takes full width.

        Desktop (≥ 1024px):
          - Nav items stack VERTICALLY.
          - The aside stays in its 220px grid column.
          - Sticky so it stays visible while the right column scrolls.
      */}
            <style>{`
        /* ── Mobile / Tablet ── */
        .account-sidebar {
          width: 100%;
        }

        .account-sidebar-nav {
          display: flex;
          flex-direction: row;
          gap: 4px;
          overflow-x: auto;
          overflow-y: visible;
          padding-bottom: 4px;
          /* hide scrollbar visually but keep it functional */
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .account-sidebar-nav::-webkit-scrollbar {
          display: none;
        }

        .account-sidebar-nav li {
          flex-shrink: 0;
        }

        /* ── Desktop ── */
        @media (min-width: 1024px) {
          .account-sidebar {
            /* stays in its 220px grid column — no position:sticky needed */
          }

          .account-sidebar-nav {
            flex-direction: column;
            overflow-x: visible;
            overflow-y: visible;
            padding-bottom: 0;
            gap: 2px;
          }

          .account-sidebar-nav li {
            flex-shrink: unset;
            width: 100%;
          }
        }
      `}</style>
        </aside>
    );
};

export default AccountSidebar;
