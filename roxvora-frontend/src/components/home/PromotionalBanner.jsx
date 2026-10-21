import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiShield, FiTruck, FiRefreshCw, FiClock, FiPercent, FiGift } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const PROMO_CARDS = [
  {
    id: 1,
    title: 'Complimentary Express Logistics',
    subtitle: 'VIP Privilege',
    description: 'Insured worldwide delivery on all curated architectural pieces exceeding ₹999.',
    image: 'https://images.unsplash.com/photo-1586204369964-d1f965a9e6c8?w=1200&q=80',
    ctaText: 'Explore Archive',
    ctaLink: '/shop',
    badge: 'Free Shipping',
    span: 'col-span-1 lg:col-span-8',
    height: 'h-[420px] sm:h-[480px]',
  },
  {
    id: 2,
    title: 'Privé 2X Rewards',
    subtitle: 'Loyalty Tier',
    description: 'Double points & private styling sessions on your next acquisition.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
    ctaText: 'Join Tier',
    ctaLink: '/register',
    badge: 'Member Only',
    span: 'col-span-1 lg:col-span-4',
    height: 'h-[420px] sm:h-[480px]',
  },
  {
    id: 3,
    title: 'Archive Season Sale',
    subtitle: 'Up to 50% Off',
    description: 'Limited-edition seasonal drapes and signature tailoring.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    ctaText: 'Shop Sale',
    ctaLink: '/shop/sale',
    badge: 'Seasonal Drop',
    span: 'col-span-1 lg:col-span-4',
    height: 'h-[380px]',
  },
  {
    id: 4,
    title: 'Bespoke Consultations',
    subtitle: 'Personalized Fit',
    description: 'Book a one-on-one virtual session with our master tailors.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
    ctaText: 'Book Session',
    ctaLink: '/consultation',
    badge: 'Concierge',
    span: 'col-span-1 lg:col-span-8',
    height: 'h-[380px]',
  },
];

const PromotionalBanner = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="py-28 md:py-40 bg-[#FAF7F2] text-neutral-950 relative overflow-hidden" aria-label="Promotional offers">

      {/* Ambient background decoration */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#9A7B2C]/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-neutral-300/60 pb-12 mb-16 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-200/70 border border-neutral-300 rounded-full text-[11px] font-semibold uppercase tracking-[0.3em] text-[#9A7B2C] mb-5 backdrop-blur-md"
            >
              <FiGift className="w-3.5 h-3.5" />
              <span>Clientele Advantages</span>
            </motion.div>
            <h2 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-neutral-950">
              Privileged Perks & Offers
            </h2>
          </div>
          <p className="text-neutral-600 text-base sm:text-lg font-light max-w-md">
            Uncompromising benefits engineered to elevate your wardrobe curation from acquisition to delivery.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 mb-20">
          {PROMO_CARDS.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`${card.span} ${card.height} relative rounded-[2.5rem] overflow-hidden group shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.15)] transition-all duration-700 bg-neutral-900`}
            >
              <Link to={card.ctaLink} className="absolute inset-0 z-20 flex flex-col justify-between p-8 sm:p-10 cursor-pointer">

                {/* Top Badge */}
                <div className="flex justify-between items-center">
                  <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md text-white rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20 shadow-lg">
                    {card.badge}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-transform duration-500 group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-black group-hover:border-transparent">
                    <FiArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                  </div>
                </div>

                {/* Bottom Text Details */}
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-[0.25em] text-[#F3E5AB] mb-2">
                    {card.subtitle}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-neutral-300 text-sm font-light leading-relaxed max-w-md line-clamp-2">
                    {card.description}
                  </p>
                </div>
              </Link>

              {/* Background Image with Zoom Effect */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-1000 ease-out opacity-60"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>
            </motion.article>
          ))}
        </div>

        {/* High-Tech Trust Badges Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-neutral-300/60">
          <div className="flex items-center gap-5 p-6 bg-white/80 backdrop-blur-md rounded-3xl border border-neutral-200 shadow-sm hover:border-[#D4AF37] transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-neutral-950 text-[#D4AF37] flex items-center justify-center flex-shrink-0 shadow-lg">
              <FiTruck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-neutral-950 text-base mb-1">Global Express Logistics</h4>
              <p className="text-xs text-neutral-500 font-light">Fully insured doorstep delivery worldwide.</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-6 bg-white/80 backdrop-blur-md rounded-3xl border border-neutral-200 shadow-sm hover:border-[#D4AF37] transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-neutral-950 text-[#D4AF37] flex items-center justify-center flex-shrink-0 shadow-lg">
              <FiShield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-neutral-950 text-base mb-1">Authenticated Luxury</h4>
              <p className="text-xs text-neutral-500 font-light">Certified ethical and sustainable fibers.</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-6 bg-white/80 backdrop-blur-md rounded-3xl border border-neutral-200 shadow-sm hover:border-[#D4AF37] transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-neutral-950 text-[#D4AF37] flex items-center justify-center flex-shrink-0 shadow-lg">
              <FiRefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-neutral-950 text-base mb-1">Concierge Returns</h4>
              <p className="text-xs text-neutral-500 font-light">Seamless complimentary home pickups.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PromotionalBanner;