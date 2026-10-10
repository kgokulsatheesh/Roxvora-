import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiLayers } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_COLLECTIONS = [
  {
    id: 1,
    name: "Women's Haute Couture & Dresses",
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1000&q=80',
    href: '/shop/women',
    productCount: '120+ Styles',
    tagline: 'Flowing Silhouettes & Botanical Drapes',
    season: 'Spring / Summer 2026',
  },
  {
    id: 2,
    name: "Men's Tailored Masterpieces",
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1000&q=80',
    href: '/shop/men',
    productCount: '85+ Pieces',
    tagline: 'Immaculate Structure & Italian Wool',
    season: 'Executive & Formal',
  },
  {
    id: 3,
    name: "Kids' Playful Luxury",
    image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=1000&q=80',
    href: '/shop/kids',
    productCount: '60+ Outfits',
    tagline: 'Breathable Organic Cottons & Easy Fits',
    season: 'Daily Elegance',
  },
  {
    id: 4,
    name: 'Signature Accessories & Jewels',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1000&q=80',
    href: '/shop/accessories',
    productCount: '200+ Items',
    tagline: 'Handcrafted Leather & Gilded Accents',
    season: 'Timeless Finishes',
  },
];

const FeaturedCollections = ({
  title = 'Featured Collections',
  subtitle = 'Explore our handpicked apparel and seasonal garments crafted for an exquisite wardrobe experience.',
  collections = DEFAULT_COLLECTIONS,
  className = '',
}) => {
  const [activeId, setActiveId] = useState(collections[0].id);
  const activeCollection = collections.find((c) => c.id === activeId) || collections[0];

  return (
    <section 
      className={`py-20 md:py-10 bg-[#FAF7F2] text-neutral-950 relative overflow-hidden ${className}`} 
      aria-labelledby="featured-collections-heading"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-[1536px]">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-neutral-300/60 pb-12 mb-16 gap-8">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-neutral-200/60 border border-neutral-300 rounded-full text-[11px] font-semibold uppercase tracking-[0.3em] text-[#9A7B2C] mb-6 backdrop-blur-md"
            >
              <FiLayers className="w-3.5 h-3.5" />
              <span>Curated Selection</span>
            </motion.div>
            
            <motion.h2
              id="featured-collections-heading"
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
            className="lg:max-w-md"
          >
            <p className="text-neutral-600 text-base sm:text-lg font-light leading-relaxed">
              {subtitle}
            </p>
          </motion.div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Side: Dynamic Cinematic Display Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative rounded-[2.5rem] overflow-hidden aspect-[4/5] sm:aspect-[16/12] lg:aspect-[4/5] shadow-2xl bg-neutral-900 group"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeCollection.id}
                src={activeCollection.image}
                alt={activeCollection.name}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-between z-10 text-white">
              <div className="flex justify-between items-center">
                <span className="px-4 py-1.5 bg-white/20 border border-white/30 rounded-full text-xs font-semibold uppercase tracking-widest backdrop-blur-md text-[#F3E5AB]">
                  {activeCollection.season}
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-300">
                  {activeCollection.productCount}
                </span>
              </div>

              <div>
                <span className="block text-xs font-semibold uppercase tracking-[0.25em] text-[#F3E5AB] mb-2">
                  Featured Focus
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2 leading-tight">
                  {activeCollection.name}
                </h3>
                <p className="text-neutral-300 text-sm font-light mb-6 max-w-md">
                  {activeCollection.tagline}
                </p>
                <Link
                  to={activeCollection.href}
                  className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white text-neutral-950 hover:bg-[#D4AF37] hover:text-black text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-xl group/btn"
                >
                  <span>Explore Lookbook</span>
                  <FiArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Selection Cards with Luxury Espresso Theme and Smooth Transitions */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {collections.map((collection, index) => {
              const isActive = activeId === collection.id;

              return (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setActiveId(collection.id)}
                  onClick={() => setActiveId(collection.id)}
                  layout
                >
                  <motion.div
                    layout
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className={`group relative flex items-center justify-between p-6 sm:p-7 rounded-2xl border transition-colors duration-500 cursor-pointer ${
                      isActive 
                        ? 'bg-[#1A1816] text-white border-[#D4AF37]/80 shadow-2xl ring-1 ring-[#D4AF37]/40' 
                        : 'bg-white/90 hover:bg-[#1A1816] hover:text-white text-neutral-950 border-neutral-200/80 shadow-sm'
                    }`}
                  >
                    <Link to={collection.href} className="absolute inset-0 z-10" aria-label={collection.name} />

                    <div className="flex items-center gap-5 sm:gap-6 relative z-20 pointer-events-none">
                      {/* Miniature Thumbnail */}
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-200">
                        <img 
                          src={collection.image} 
                          alt={collection.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                      </div>

                      <div>
                        <span className={`block text-[10px] font-semibold uppercase tracking-[0.25em] mb-1 transition-colors duration-300 ${isActive ? 'text-[#D4AF37]' : 'text-[#9A7B2C] group-hover:text-[#D4AF37]'}`}>
                          {collection.season}
                        </span>
                        <h4 className="text-lg sm:text-xl font-serif font-bold tracking-tight mb-0.5 text-white">
                          {collection.name}
                        </h4>
                        <span className={`text-xs font-light transition-colors duration-300 ${isActive ? 'text-neutral-300' : 'text-neutral-500 group-hover:text-neutral-300'}`}>
                          {collection.productCount} • {collection.tagline}
                        </span>
                      </div>
                    </div>

                    <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 flex-shrink-0 relative z-20 pointer-events-none ${
                      isActive 
                        ? 'bg-[#D4AF37] border-[#D4AF37] text-black rotate-45' 
                        : 'border-neutral-300 text-neutral-900 group-hover:bg-[#D4AF37] group-hover:text-black group-hover:border-[#D4AF37] group-hover:rotate-45'
                    }`}>
                      <FiArrowUpRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default FeaturedCollections;