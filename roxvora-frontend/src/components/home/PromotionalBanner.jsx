import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

import { motion } from 'framer-motion';

const DEFAULT_BANNERS = [
  {
    id: 1,
    title: 'Free Shipping',
    description: 'On all orders over \u20B9999',
    image: 'https://images.unsplash.com/photo-1586204369964-d1f965a9e6c8?w=800&q=80',
    ctaText: 'Shop Now',
    ctaLink: '/shop',
    background: 'var(--gradient-ink)',
  },
  {
    id: 2,
    title: 'Members Get More',
    description: 'Earn 2x points on every order',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
    ctaText: 'Join Free',
    ctaLink: '/register',
    background: 'var(--gradient-gold)',
  },
  {
    id: 3,
    title: 'Season Sale',
    description: 'Up to 50% off selected styles',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    ctaText: 'View Sale',
    ctaLink: '/shop/sale',
    background: 'var(--color-secondary-dark)',
  },
];

const PromotionalBanner = ({ banners = DEFAULT_BANNERS, className = '' }) => {
  return (
    <section className={`py-16 md:py-20 ${className}`} aria-label="Promotional offers">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {banners.map((banner, index) => {
            const onGold = banner.background === 'var(--gradient-gold)';

            return (
              <motion.article
                key={banner.id}
                initial={{ y: 28, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-2xl h-72 group shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <Link
                  to={banner.ctaLink}
                  className="absolute inset-0 h-full w-full flex flex-col justify-end p-6 md:p-8"
                  style={{ background: banner.background }}
                  aria-label={`${banner.title} \u2014 ${banner.ctaText}`}
                >
                  {banner.image && (
                    <img
                      src={banner.image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 opacity-25"
                      loading="lazy"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'linear-gradient(to top, rgba(10,10,11,0.55), transparent 70%)' }}
                    aria-hidden="true"
                  />

                  <span className="relative block">
                    <span
                      className={`block text-2xl md:text-3xl font-secondary font-semibold mb-2 leading-tight ${
                        onGold ? 'text-primary-900' : 'text-white'
                      }`}
                    >
                      {banner.title}
                    </span>
                    <span
                      className={`block text-sm md:text-base mb-5 ${
                        onGold ? 'text-primary-800/80' : 'text-white/80'
                      }`}
                    >
                      {banner.description}
                    </span>
                    <span
                      className={`btn btn-md w-fit inline-flex items-center gap-2 ${
                        onGold ? 'btn-primary' : 'btn-secondary !border-white/40 !text-white'
                      }`}
                    >
                      {banner.ctaText}
                      <FiArrowRight
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
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
