import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiChevronRight, FiChevronLeft, FiArrowUpRight, FiHeart, FiEye, FiX, FiShoppingBag, FiCheck } from 'react-icons/fi';
import { Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Advanced Luxury Product Card with Full-Page Link & Quick View Modal Support
export const AdvancedProductCard = ({ product, onQuickView }) => {
  const navigate = useNavigate();
  const images = product.images && product.images.length > 0 ? product.images : [product.image || product.imageUrl];
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleCardClick = () => {
    navigate(product.href || `/product/${product.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative flex flex-col bg-white rounded-[2rem] p-3.5 sm:p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.12)] transition-all duration-700 border border-neutral-100 overflow-hidden cursor-pointer"
    >
      
      {/* Reduced Card Image Container */}
      <div className="relative overflow-hidden rounded-[1.5rem] aspect-[4/5] bg-neutral-100 mb-3.5">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImgIndex}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src={images[currentImgIndex]}
              alt={product.name || product.title}
              className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-1000 ease-out"
              loading="lazy"
            />
          </motion.div>
        </AnimatePresence>

        {/* Floating Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-20">
            <span className="px-3 py-1 bg-black/40 backdrop-blur-md text-white rounded-full text-[9px] font-bold uppercase tracking-widest border border-white/20 shadow-md">
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-md ${
            isLiked ? 'bg-[#9A7B2C] text-white' : 'bg-white/80 text-neutral-800 hover:bg-white'
          }`}
          aria-label="Wishlist"
        >
          <FiHeart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        {/* Dot Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 z-20 flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentImgIndex(idx);
                }}
                className={`h-1 rounded-full transition-all duration-300 ${
                  idx === currentImgIndex ? 'w-5 bg-white' : 'w-1 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-20"
              aria-label="Previous image"
            >
              <FiChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-20"
              aria-label="Next image"
            >
              <FiChevronRight className="w-3.5 h-3.5" />
            </button>
          </>
        )}

        {/* Quick View Drawer Action Trigger */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-center gap-2 z-20">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 py-2 bg-white/95 hover:bg-white text-neutral-950 rounded-xl text-[10px] font-bold uppercase tracking-widest text-center backdrop-blur-md transition-colors shadow-sm flex items-center justify-center gap-1.5"
          >
            <FiEye className="w-3 h-3" />
            <span>Quick Preview</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-grow px-1">
        <h3 className="text-base font-serif font-bold text-neutral-950 tracking-tight group-hover:text-[#9A7B2C] transition-colors line-clamp-1">
          {product.name || product.title}
        </h3>
        
        <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest mb-3">
          {product.subtitle || product.category || 'Wardrobe Essential'}
        </p>

        <div className="mt-auto flex items-center justify-between pt-2.5 border-t border-neutral-100">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-bold font-serif text-neutral-950">
              ${product.price || '111'}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-neutral-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-neutral-950 group-hover:bg-[#9A7B2C] text-white group-hover:text-black text-[10px] font-bold uppercase tracking-widest transition-all duration-300 shadow-sm">
            <span>View</span>
            <FiArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};

// Immersive Quick View Modal Component
const QuickViewModal = ({ product, onClose }) => {
  if (!product) return null;
  const images = product.images && product.images.length > 0 ? product.images : [product.image || product.imageUrl];
  const [selectedImg, setSelectedImg] = useState(images[0]);
  const [selectedSize, setSelectedSize] = useState('M');
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-[2.5rem] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 border border-white/40"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-neutral-900 flex items-center justify-center shadow-md transition-all"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Left: Image Preview Gallery */}
        <div className="md:col-span-6 p-6 flex flex-col gap-4 bg-white">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100 shadow-inner">
            <img src={selectedImg} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(img)}
                  className={`relative w-16 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImg === img ? 'border-[#9A7B2C] scale-105' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Actions */}
        <div className="md:col-span-6 p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <span className="inline-block px-3 py-1 bg-neutral-200/60 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#9A7B2C] mb-3">
              {product.category || 'Luxury Collection'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-950 mb-2">
              {product.name || product.title}
            </h2>
            <div className="text-xl font-bold font-serif text-neutral-900 mb-4">
              ${product.price || '111'}
            </div>
            <p className="text-neutral-600 text-sm font-light leading-relaxed mb-6">
              {product.description || 'Crafted with premium Italian textiles, ensuring an immaculate architectural fit, lightweight comfort, and timeless elegance.'}
            </p>

            {/* Size Selector */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Select Size:</label>
              <div className="flex gap-2.5">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-11 h-11 rounded-xl text-xs font-bold uppercase transition-all ${
                      selectedSize === size
                        ? 'bg-neutral-950 text-white shadow-md'
                        : 'bg-white text-neutral-800 border border-neutral-300 hover:border-neutral-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 ${
                added ? 'bg-emerald-600 text-white' : 'bg-neutral-950 hover:bg-[#9A7B2C] text-white hover:text-black'
              }`}
            >
              {added ? <FiCheck className="w-4 h-4" /> : <FiShoppingBag className="w-4 h-4" />}
              <span>{added ? 'Added to Bag' : 'Add to Shopping Bag'}</span>
            </button>

            <Link
              to={product.href || `/product/${product.id}`}
              className="w-full py-3 rounded-full border border-neutral-900/30 text-neutral-900 text-center text-xs font-bold uppercase tracking-widest hover:bg-neutral-900 hover:text-white transition-all"
            >
              View Full Product Page
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProductSection = ({
  title,
  subtitle,
  products = [],
  viewAllLink,
  viewAllText = 'Explore Complete Lookbook',
  maxProducts = 8,
  showFilters = false,
  categories = ['All', 'Dresses', 'Tailored', 'Accessories'],
  className = '',
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isPaused, setIsPaused] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const filteredProducts = products.filter((product) => {
    if (!showFilters || activeCategory === 'All') return true;
    return product.category?.toLowerCase() === activeCategory.toLowerCase();
  });

  const displayProducts = filteredProducts.slice(0, maxProducts);
  const headingId = `${(title || 'products').toLowerCase().replace(/\s+/g, '-')}-heading`;

  return (
    <section className={`py-28 md:py-36 bg-[#FAF7F2] text-neutral-950 relative overflow-hidden ${className}`} aria-labelledby={headingId}>
      
      {/* Infinite Marquee Background Text ("ROXVORA") */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 left-0 w-full overflow-hidden pointer-events-auto cursor-pointer opacity-[0.035] select-none z-0"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        title="Touch or hover to pause"
      >
        <div className="flex whitespace-nowrap">
          <div className={`flex gap-12 text-[14vw] font-serif font-extrabold uppercase tracking-tighter ${isPaused ? '' : 'animate-marquee'}`}>
            <span>ROXVORA</span>
            <span>ROXVORA</span>
            <span>ROXVORA</span>
          </div>
          <div className={`flex gap-12 text-[14vw] font-serif font-extrabold uppercase tracking-tighter ml-12 ${isPaused ? '' : 'animate-marquee'}`} aria-hidden="true">
            <span>ROXVORA</span>
            <span>ROXVORA</span>
            <span>ROXVORA</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-[1536px] relative z-10">
        
        {/* Header Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14 md:mb-20">
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-neutral-200/70 border border-neutral-300 rounded-full text-[11px] font-semibold uppercase tracking-[0.3em] text-[#9A7B2C] mb-6 backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Exquisite Tailoring & Silhouettes 2026</span>
            </motion.div>

            <motion.h2
              id={headingId}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-neutral-950 leading-[1.05]"
            >
              {title}
            </motion.h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col items-start lg:items-end justify-end gap-6"
          >
            {subtitle && (
              <p className="text-neutral-600 text-base sm:text-lg font-light leading-relaxed lg:text-right max-w-md">
                {subtitle}
              </p>
            )}

            {viewAllLink && (
              <Link
                to={viewAllLink}
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-neutral-900 bg-neutral-900 text-white hover:bg-[#9A7B2C] hover:border-[#9A7B2C] hover:text-black text-xs font-bold uppercase tracking-widest transition-all duration-300 group shadow-lg"
              >
                <span>{viewAllText}</span>
                <FiArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            )}
          </motion.div>
        </div>

        {/* Filter Pills */}
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center gap-3 mb-14 border-t border-neutral-300/60 pt-8"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 mr-2">Filter Look:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-500 ${
                  activeCategory === cat
                    ? 'bg-[#1A1816] text-white shadow-xl ring-2 ring-[#D4AF37]/50 scale-105'
                    : 'bg-white/80 text-neutral-600 hover:bg-neutral-200 border border-neutral-300/80 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        )}

        {/* Product Grid */}
        {displayProducts.length === 0 ? (
          <div className="text-center py-28 bg-white/50 rounded-[2.5rem] border border-dashed border-neutral-300">
            <p className="text-neutral-500 font-light tracking-wide text-lg">No garments available in this curation.</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            <AnimatePresence>
              {displayProducts.map((product, index) => (
                <motion.div
                  key={product.id || index}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.7,
                    delay: (index % 4) * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <AdvancedProductCard product={product} onQuickView={setQuickViewProduct} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Quick View Modal Drawer Render */}
      <AnimatePresence>
        {quickViewProduct && (
          <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ProductSection;