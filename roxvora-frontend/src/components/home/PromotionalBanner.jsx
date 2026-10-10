import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const DEFAULT_BANNERS = [
  {
    id: 1,
    title: 'Complimentary Global Shipping',
    subtitle: 'Exclusive Privilege',
    description: 'On all bespoke and curated orders exceeding ₹999.',
    image: 'https://images.unsplash.com/photo-1586204369964-d1f965a9e6c8?w=1200&q=80',
    ctaText: 'Explore Lookbook',
    ctaLink: '/shop',
    featured: true, // Makes this card larger and cinematic
  },
  {
    id: 2,
    title: 'Privé Membership Tier',
    subtitle: 'Earn 2X Rewards',
    description: 'Unlock private styling sessions and double loyalty points on every acquisition.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
    ctaText: 'Join Free',
    ctaLink: '/register',
    featured: false,
  },
  {
    id: 3,
    title: 'Architectural Season Sale',
    subtitle: 'Limited Archive',
    description: 'Up to 50% off selected master tailoring and seasonal drapes.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    ctaText: 'View Archive',
    ctaLink: '/shop/sale',
    featured: false,
  },
];

const PromotionalBanner = ({ banners = DEFAULT_BANNERS, className = '' }) => {
  return (
    <section className={`py-24 md:py-36 bg-[#FAF7F2] text-neutral-950 relative overflow-hidden ${className}`} aria-label="Promotional offers">
      <div className="container mx-auto px-6 md:px-12 max-w-[1536px]">
        
        {/* Editorial Section Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-300/60 pb-10 mb-14 gap-6">
          <div>
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.3em] text-[#9A7B2C] mb-3">
              Privileged Access
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-neutral-950">
              Curated Advantages
            </h2>
          </div>
          <p className="text-neutral-600 text-sm sm:text-base font-light max-w-sm">
            Designed for those who appreciate uncompromising craftsmanship and elevated wardrobe experiences.
          </p>
        </div>

        {/* Asymmetrical High-End Editorial Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {banners.map((banner, index) => {
            const isFeatured = banner.featured;

            return (
              <motion.article
                key={banner.id}
                initial={{ y: 35, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className={`relative overflow-hidden rounded-[2.5rem] group shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] transition-all duration-700 ${
                  isFeatured ? 'lg:col-span-7 h-[450px] md:h-[520px]' : 'lg:col-span-5 h-[240px] md:h-[246px]'
                }`}
              >
                <Link
                  to={banner.ctaLink}
                  className="absolute inset-0 h-full w-full flex flex-col justify-end p-8 sm:p-10 z-20 cursor-pointer"
                  aria-label={`${banner.title} — ${banner.ctaText}`}
                >
                  {/* Background Image with Cinematic Zoom & Vignette */}
                  {banner.image && (
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-1000 ease-out"
                      loading="lazy"
                    />
                  )}

                  {/* Deep Luxury Gradient Overlay for High Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1816]/95 via-[#1A1816]/40 to-transparent transition-opacity duration-500" />

                  {/* Content Container */}
                  <div className="relative z-10 flex flex-col items-start justify-end h-full">
                    <span className="px-3.5 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-[#F3E5AB] mb-4 border border-white/20">
                      {banner.subtitle}
                    </span>

                    <h3 className={`font-serif font-bold text-white tracking-tight mb-2 ${isFeatured ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'}`}>
                      {banner.title}
                    </h3>

                    <p className={`text-neutral-300 font-light leading-relaxed mb-6 line-clamp-2 ${isFeatured ? 'text-sm sm:text-base max-w-lg' : 'text-xs sm:text-sm'}`}>
                      {banner.description}
                    </p>

                    <span className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-white text-neutral-950 group-hover:bg-[#D4AF37] group-hover:text-black text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-xl">
                      <span>{banner.ctaText}</span>
                      <span className="w-5 h-5 rounded-full bg-neutral-950 text-white group-hover:bg-black flex items-center justify-center transition-transform group-hover:rotate-45">
                        <FiArrowUpRight className="w-3 h-3" />
                      </span>
                    </span>
                  </div>
                </Link>
              </motion.article>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default PromotionalBanner;