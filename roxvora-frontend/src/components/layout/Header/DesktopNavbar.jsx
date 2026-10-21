import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiUser, FiHeart, FiShoppingBag, FiTag, FiStar, FiHome, FiMail } from 'react-icons/fi';

import CategoryMenu from './CategoryMenu';

const categories = [
  { label: 'Women', href: '/shop/women', icon: FiUser },
  { label: 'Men', href: '/shop/men', icon: FiUser },
  { label: 'Kids', href: '/shop/kids', icon: FiHeart },
  { label: 'Accessories', href: '/shop/accessories', icon: FiShoppingBag },
  { label: 'Sale', href: '/shop/sale', icon: FiTag },
  { label: 'New Arrivals', href: '/shop/new', icon: FiStar },
];

// Simple direct links that don't need a dropdown
const directLinks = [
  { label: 'Home', href: '/', icon: FiHome },
  { label: 'Contact', href: '/contact', icon: FiMail },
];

const DesktopNavbar = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const navbarRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setActiveCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="hidden lg:flex items-center gap-1" ref={navbarRef} role="menubar">
      {/* Home */}
      <Link
        to="/"
        className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
          location.pathname === '/'
            ? 'text-secondary bg-primary-50'
            : 'text-neutral-600 hover:text-primary'
        }`}
        role="menuitem"
      >
        <FiHome className="w-4 h-4" aria-hidden="true" />
        Home
      </Link>

      {/* Shop category dropdowns */}
      {categories.map((category, index) => (
        <CategoryMenu
          key={category.href}
          category={category}
          isActive={activeCategory === index}
          onMouseEnter={() => setActiveCategory(index)}
          onMouseLeave={() => setActiveCategory(null)}
        />
      ))}

      {/* Contact */}
      <Link
        to="/contact"
        className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
          location.pathname === '/contact'
            ? 'text-secondary bg-primary-50'
            : 'text-neutral-600 hover:text-primary'
        }`}
        role="menuitem"
      >
        <FiMail className="w-4 h-4" aria-hidden="true" />
        Contact
      </Link>
    </div>
  );
};

export default DesktopNavbar;