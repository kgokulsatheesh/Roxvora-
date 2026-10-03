import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiLogOut, FiChevronDown, FiHeart, FiPackage, FiMapPin, FiSettings } from 'react-icons/fi';

import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectIsAuthenticated } from '@store/slices/authSlice';
import { logout } from '@store/slices/authSlice';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="hidden lg:flex items-center gap-2">
        <Link to="/login" className="btn btn-ghost btn-sm">
          Sign In
        </Link>
        <Link to="/register" className="btn btn-primary btn-sm">
          Sign Up
        </Link>
      </div>
    );
  }

  const menuItems = [
    { label: 'My Account', href: '/account', icon: FiUser },
    { label: 'Orders', href: '/account/orders', icon: FiPackage },
    { label: 'Addresses', href: '/account/addresses', icon: FiMapPin },
    { label: 'Wishlist', href: '/wishlist', icon: FiHeart },
    { label: 'Settings', href: '/account/settings', icon: FiSettings },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="user-menu"
      >
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <FiUser className="w-5 h-5 text-primary-contrast" aria-hidden="true" />
        </div>
        <span className="hidden md:block text-sm font-medium text-primary">{user?.name || 'Account'}</span>
        <FiChevronDown className={`w-4 h-4 text-neutral-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          id="user-menu"
          className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden z-50 animate-slide-down"
          role="menu"
          aria-label="User menu"
        >
          <div className="px-4 py-3 border-b bg-neutral-50">
            <p className="font-medium text-primary truncate">{user?.name}</p>
            <p className="text-sm text-secondary truncate">{user?.email}</p>
          </div>

          <nav className="py-2" role="menu">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-primary transition-colors"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-5 h-5" aria-hidden="true" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="border-t px-4 py-2">
            <button
              type="button"
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-error hover:bg-neutral-50 rounded-lg transition-colors"
              onClick={handleLogout}
              role="menuitem"
            >
              <FiLogOut className="w-5 h-5" aria-hidden="true" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;