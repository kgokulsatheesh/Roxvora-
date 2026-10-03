import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi';

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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

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
      className={`sticky top-0 left-0 right-0 z-[900] transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md border-b border-neutral-200'
          : 'bg-white border-b border-neutral-200'
      }`}
      role="banner"
    >
      <TopBar />

      <div className="relative">
        <nav
          className="flex items-center justify-between container mx-auto px-4 py-4 lg:px-8"
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
            <button
              type="button"
              className="btn btn-ghost btn-icon-lg lg:hidden"
              onClick={handleSearchOpen}
              aria-label="Open search"
            >
              <FiSearch className="w-5 h-5" aria-hidden="true" />
            </button>

            <CartIcon />
            <WishlistIcon />
            <UserMenu />

            <button
              type="button"
              className="btn btn-ghost btn-icon-lg lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        <MobileNavbar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      </div>

      <SearchDrawer isOpen={isSearchOpen} onClose={handleSearchClose} />
    </header>
  );
};

export default Header;