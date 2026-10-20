// import { useState, useRef, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { FiUser, FiHeart, FiShoppingBag, FiTag, FiStar, FiHome, FiMail, FiSearch, FiX } from 'react-icons/fi';
// import { motion, AnimatePresence } from 'framer-motion';

// import CategoryMenu from './CategoryMenu';

// const categories = [
//   { label: 'Women', href: '/shop/women', icon: FiUser },
//   { label: 'Men', href: '/shop/men', icon: FiUser },
//   { label: 'Kids', href: '/shop/kids', icon: FiHeart },
//   { label: 'Accessories', href: '/shop/accessories', icon: FiShoppingBag },
//   { label: 'Sale', href: '/shop/sale', icon: FiTag },
//   { label: 'New Arrivals', href: '/shop/new', icon: FiStar },
// ];

// const directLinks = [
//   { label: 'Home', href: '/', icon: FiHome },
//   { label: 'Contact', href: '/contact', icon: FiMail },
// ];

// // Rotating placeholder texts for the search box
// const searchPlaceholders = [
//   "Search 'Best Women Collections'...",
//   "Search 'Silk Evening Dresses'...",
//   "Search 'Italian Wool Suits'...",
//   "Search 'Summer Linen Midi'..."
// ];

// const DesktopNavbar = () => {
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [placeholderIndex, setPlaceholderIndex] = useState(0);
//   const navbarRef = useRef(null);
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Rotate placeholders every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPlaceholderIndex((prev) => (prev + 1) % searchPlaceholders.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (navbarRef.current && !navbarRef.current.contains(event.target)) {
//         setActiveCategory(null);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
//     }
//   };

//   return (
//     <div className="hidden lg:flex items-center justify-between w-full gap-6 px-4" ref={navbarRef} role="menubar">
      
//       {/* Left: Nav Links */}
//       <div className="flex items-center gap-1">
//         {/* Home */}
//         <Link
//           to="/"
//           className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
//             location.pathname === '/'
//               ? 'text-secondary bg-primary-50'
//               : 'text-neutral-600 hover:text-primary'
//           }`}
//           role="menuitem"
//         >
//           <FiHome className="w-4 h-4" aria-hidden="true" />
//           Home
//         </Link>

//         {/* Shop category dropdowns */}
//         {categories.map((category, index) => (
//           <CategoryMenu
//             key={category.href}
//             category={category}
//             isActive={activeCategory === index}
//             onMouseEnter={() => setActiveCategory(index)}
//             onMouseLeave={() => setActiveCategory(null)}
//           />
//         ))}

//         {/* Contact */}
//         <Link
//           to="/contact"
//           className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
//             location.pathname === '/contact'
//               ? 'text-secondary bg-primary-50'
//               : 'text-neutral-600 hover:text-primary'
//           }`}
//           role="menuitem"
//         >
//           <FiMail className="w-4 h-4" aria-hidden="true" />
//           Contact
//         </Link>
//       </div>

//       {/* Right: Dynamic Animated Search Bar */}
//       <form onSubmit={handleSearchSubmit} className="relative flex items-center w-72">
//         <div className="relative w-full flex items-center">
//           <FiSearch className="absolute left-3.5 w-4 h-4 text-neutral-400 pointer-events-none" />
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-10 pr-8 py-2 bg-neutral-100/80 border border-neutral-200 rounded-full text-xs font-medium text-neutral-900 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-all shadow-inner"
//           />
//           {/* Animated placeholder overlay when query is empty */}
//           {!searchQuery && (
//             <div className="absolute left-10 right-8 pointer-events-none overflow-hidden text-ellipsis whitespace-nowrap">
//               <AnimatePresence mode="wait">
//                 <motion.span
//                   key={placeholderIndex}
//                   initial={{ opacity: 0, y: 8 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -8 }}
//                   transition={{ duration: 0.3 }}
//                   className="text-xs text-neutral-400 font-light block"
//                 >
//                   {searchPlaceholders[placeholderIndex]}
//                 </motion.span>
//               </AnimatePresence>
//             </div>
//           )}
//           {searchQuery && (
//             <button
//               type="button"
//               onClick={() => setSearchQuery('')}
//               className="absolute right-3 text-neutral-400 hover:text-neutral-700"
//             >
//               <FiX className="w-3.5 h-3.5" />
//             </button>
//           )}
//         </div>
//       </form>

//     </div>
//   );
// };

// export default DesktopNavbar;

// old header code 


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