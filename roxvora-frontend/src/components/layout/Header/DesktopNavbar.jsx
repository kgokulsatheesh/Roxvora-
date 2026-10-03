import { useState, useRef, useEffect } from 'react';
import { FiUser, FiHeart, FiShoppingBag, FiTag, FiStar } from 'react-icons/fi';

import CategoryMenu from './CategoryMenu';

const categories = [
  { label: 'Women', href: '/shop/women', icon: FiUser },
  { label: 'Men', href: '/shop/men', icon: FiUser },
  { label: 'Kids', href: '/shop/kids', icon: FiHeart },
  { label: 'Accessories', href: '/shop/accessories', icon: FiShoppingBag },
  { label: 'Sale', href: '/shop/sale', icon: FiTag },
  { label: 'New Arrivals', href: '/shop/new', icon: FiStar },
];

const DesktopNavbar = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const navbarRef = useRef(null);

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
    <div className="hidden lg:flex items-center gap-6" ref={navbarRef} role="menubar">
      {categories.map((category, index) => (
        <CategoryMenu
          key={category.href}
          category={category}
          isActive={activeCategory === index}
          onMouseEnter={() => setActiveCategory(index)}
          onMouseLeave={() => setActiveCategory(null)}
        />
      ))}
    </div>
  );
};

export default DesktopNavbar;