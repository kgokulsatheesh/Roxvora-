import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiSearch } from 'react-icons/fi';

import TopBar from './TopBar';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import SearchDrawer from './SearchDrawer';
import CartIcon from './CartIcon';
import WishlistIcon from './WishlistIcon';
import UserMenu from './UserMenu';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 left-0 right-0 z-[900] transition-all duration-300 ${isScrolled
          ? 'bg-white shadow-md border-b border-neutral-200'
          : 'bg-white border-b border-neutral-200'
        }`}
      role="banner"
    >
      <TopBar />

      <div className="relative">
        {/* ── MOBILE TOP BAR (hidden on lg+) ── */}
        <div className="flex lg:hidden items-center justify-between px-4 py-3">
          {/* Hamburger */}
          <button
            type="button"
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            <FiMenu className="w-5 h-5" />
          </button>

          {/* Logo — centred */}
          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 font-black tracking-[0.22em] text-primary"
            style={{ fontSize: 20 }}
            aria-label="ROXVORA Home"
          >
            ROXVORA
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="flex items-center justify-center w-9 h-9 rounded-xl text-neutral-700 hover:bg-neutral-100 transition-colors"
              onClick={handleSearchOpen}
              aria-label="Search"
            >
              <FiSearch className="w-5 h-5" />
            </button>
            <CartIcon />
          </div>
        </div>

        {/* ── DESKTOP NAV BAR (hidden on mobile) ── */}
        <nav
          className="hidden lg:flex items-center justify-between container mx-auto px-4 py-4 lg:px-8"
          role="navigation"
          aria-label="Main navigation"
        >
          <Link to="/" className="flex items-center gap-2 z-10 shrink-0" aria-label="ROXVORA Home">
            <span className="text-2xl font-secondary font-bold tracking-[0.2em] text-primary">
              ROXVORA
            </span>
          </Link>

          <DesktopNavbar />

          <div className="flex items-center gap-2 lg:gap-4">
            <CartIcon />
            <WishlistIcon />
            <UserMenu />
          </div>
        </nav>

        {/* ── MOBILE DRAWER (slide-in, full-screen) ── */}
        <MobileNavbar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </div>

      {/* Desktop search drawer */}
      <SearchDrawer isOpen={isSearchOpen} onClose={handleSearchClose} />
    </header>
  );
};

export default Header;