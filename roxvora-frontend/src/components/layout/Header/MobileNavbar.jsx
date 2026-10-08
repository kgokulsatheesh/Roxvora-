import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiX, FiChevronRight, FiHome, FiShoppingBag, FiStar, FiTag, FiHeart, FiShoppingCart, FiCreditCard, FiUser, FiMail, FiSearch } from 'react-icons/fi';
import { createPortal } from 'react-dom';
import SearchDrawer from './SearchDrawer';

// Primary page navigation shown in the drawer
const NAV_SECTIONS = [
  {
    heading: 'Pages',
    items: [
      { label: 'Home', href: '/', icon: FiHome },
      { label: 'Shop', href: '/shop', icon: FiShoppingBag },
      { label: 'New Arrivals', href: '/shop/new', icon: FiStar },
      { label: 'Sale', href: '/shop/sale', icon: FiTag },
      { label: 'Wishlist', href: '/wishlist', icon: FiHeart },
      { label: 'Cart', href: '/cart', icon: FiShoppingCart },
      { label: 'Checkout', href: '/checkout', icon: FiCreditCard },
    ],
  },
  {
    heading: 'Shop by Category',
    items: [
      { label: 'Women', href: '/shop/women' },
      { label: 'Men', href: '/shop/men' },
      { label: 'Kids', href: '/shop/kids' },
      { label: 'Accessories', href: '/shop/accessories' },
    ],
  },
  {
    heading: 'Account & Support',
    items: [
      { label: 'My Account', href: '/account', icon: FiUser },
      { label: 'My Orders', href: '/account/orders', icon: FiShoppingBag },
      { label: 'Contact Us', href: '/contact', icon: FiMail },
    ],
  },
];

/**
 * MobileNavbar
 *
 * Props:
 *   isOpen  {boolean}   — whether the slide-in menu is visible
 *   onClose {function}  — callback to close the menu
 */
const MobileNavbar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

  if (!isOpen && !searchOpen) return null;

  const handleNavigate = (href) => {
    onClose?.();
    navigate(href);
  };

  return createPortal(
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[800] lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Slide-in panel */}
      <nav
        id="mobile-menu"
        className={`fixed inset-y-0 left-0 z-[810] w-72 bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-16 border-b flex-shrink-0">
          <Link
            to="/"
            className="text-xl font-secondary font-bold tracking-[0.15em] text-primary"
            onClick={onClose}
          >
            ROXVORA
          </Link>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="btn btn-ghost btn-icon"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <FiSearch className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-icon"
              onClick={onClose}
              aria-label="Close menu"
            >
              <FiX className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Scrollable nav sections */}
        <div className="flex-1 overflow-y-auto py-2">
          {NAV_SECTIONS.map((section, si) => (
            <div key={section.heading}>
              {si > 0 && <hr className="mx-4 my-2 border-neutral-100" />}

              <p className="px-5 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
                {section.heading}
              </p>

              <ul role="list">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <li key={item.href} role="none">
                      <button
                        type="button"
                        className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors rounded-lg mx-1 ${isActive
                            ? 'text-secondary bg-primary-50'
                            : 'text-neutral-700 hover:bg-neutral-50 hover:text-primary'
                          }`}
                        style={{ width: 'calc(100% - 8px)' }}
                        onClick={() => handleNavigate(item.href)}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <span className="flex items-center gap-3">
                          {Icon && (
                            <Icon
                              className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-secondary' : 'text-neutral-400'}`}
                              aria-hidden="true"
                            />
                          )}
                          {item.label}
                        </span>
                        <FiChevronRight
                          className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-secondary' : 'text-neutral-300'}`}
                          aria-hidden="true"
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {/* Search drawer */}
      <SearchDrawer isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>,
    document.body
  );
};

export default MobileNavbar;
