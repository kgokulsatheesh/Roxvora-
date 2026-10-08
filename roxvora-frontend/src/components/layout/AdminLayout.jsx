import { useState } from 'react';
import { Outlet, NavLink, useLocation, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from '../common/PageTransition/PageTransition';
import { FiMenu, FiX, FiHome, FiBox, FiShoppingBag, FiUsers, FiTag, FiDollarSign, FiSettings, FiGrid, FiChevronRight, FiLogOut, FiBell, FiSearch, FiUser } from 'react-icons/fi';

import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logout } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const adminNavItems = [
  { label: 'Dashboard', href: '/admin', icon: FiGrid },
  { label: 'Products', href: '/admin/products', icon: FiBox },
  { label: 'Categories', href: '/admin/categories', icon: FiTag },
  { label: 'Orders', href: '/admin/orders', icon: FiShoppingBag },
  { label: 'Customers', href: '/admin/customers', icon: FiUsers },
  { label: 'Offers', href: '/admin/offers', icon: FiDollarSign },
  { label: 'Content', href: '/admin/content', icon: FiHome },
  { label: 'Settings', href: '/admin/settings', icon: FiSettings },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-neutral-200 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        aria-label="Admin sidebar"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <Link to="/admin" className="flex items-center gap-2">
              <span className="text-xl font-secondary font-bold text-primary">ROXVORA</span>
              <span className="badge badge-primary badge-xs">Admin</span>
            </Link>
            <button
              type="button"
              className="btn btn-ghost btn-icon lg:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <FiX className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1" role="navigation" aria-label="Admin navigation">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
              return (
                <NavLink
                  key={item.label}
                  to={item.href}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                    ${isActive
                      ? 'bg-primary-50 text-secondary'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-primary'
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                  {item.label}
                  {isActive && <FiChevronRight className="w-4 h-4 ml-auto text-secondary" aria-hidden="true" />}
                </NavLink>
              );
            })}
          </nav>

          <div className="p-4 border-t">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <FiUser className="w-5 h-5 text-primary-contrast" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary truncate">{user?.name || 'Admin User'}</p>
                <p className="text-xs text-secondary truncate">{user?.email || 'admin@roxvora.com'}</p>
              </div>
            </div>
            <button
              type="button"
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-error hover:bg-neutral-50 rounded-lg transition-colors mt-2"
              onClick={handleLogout}
            >
              <FiLogOut className="w-5 h-5" aria-hidden="true" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <button
            type="button"
            className="btn btn-ghost btn-icon lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <FiMenu className="w-6 h-6" aria-hidden="true" />
          </button>

          <div className="flex-1 max-w-xl mx-4 lg:mx-0">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search products, orders, customers..."
                className="w-full pl-10 pr-4 py-2 bg-neutral-100 border-0 rounded-lg text-primary placeholder-neutral-400 focus:bg-white focus:ring-2 focus:ring-secondary focus:outline-none transition-all"
                aria-label="Admin search"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <button
              type="button"
              className="btn btn-ghost btn-icon relative"
              aria-label="Notifications"
            >
              <FiBell className="w-5 h-5" aria-hidden="true" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary text-white text-xs font-bold rounded-full flex items-center justify-center">3</span>
            </button>

            <div className="hidden lg:flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <FiUser className="w-5 h-5 text-primary-contrast" aria-hidden="true" />
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-primary">{user?.name || 'Admin'}</p>
                <p className="text-xs text-secondary">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-8" role="main" id="admin-main-content">
          <AnimatePresence mode="wait" initial={false}>
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;