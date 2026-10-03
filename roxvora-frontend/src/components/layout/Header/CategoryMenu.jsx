import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';


const CategoryMenu = ({ category, isActive, onMouseEnter, onMouseLeave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    setIsOpen(isActive);
  }, [isActive]);

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

  const subCategories = {
    Women: ['Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Knitwear'],
    Men: ['Tops', 'Bottoms', 'Outerwear', 'Shoes'],
    Kids: ['Boys', 'Girls', 'Baby', 'Toys'],
    Accessories: ['Accessories', 'Bags', 'Shoes'],
    Sale: ['Up to 50%', 'Up to 70%', 'Clearance', 'Final Sale'],
    'New Arrivals': ['This Week', 'Trending', 'Best Sellers', 'Coming Soon'],
  };

  const subs = subCategories[category.label] || [];
  const Icon = category.icon;

  return (
    <div
      ref={menuRef}
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="menuitem"
      aria-haspopup="true"
      aria-expanded={isOpen}
    >
      <Link
        to={category.href}
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
          isActive ? 'text-secondary bg-primary-50' : 'text-neutral-600 hover:text-primary'
        }`}
        role="menuitem"
        aria-label={category.label}
      >
        {Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
        {category.label}
        <FiChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </Link>

      {isOpen && subs.length > 0 && (
        <div
          className="absolute top-full left-0 pt-2"
          role="menu"
          aria-label={`${category.label} subcategories`}
        >
          <div className="w-48 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 animate-slide-down">
            {subs.map((sub, i) => (
              <Link
                key={i}
                to={`${category.href}/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                className="block px-4 py-2 text-sm text-neutral-600 hover:text-primary hover:bg-neutral-50 transition-colors"
                role="menuitem"
              >
                <span className="flex items-center gap-2">
                  <FiChevronRight className="w-3 h-3 text-neutral-400" aria-hidden="true" />
                  {sub}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryMenu;