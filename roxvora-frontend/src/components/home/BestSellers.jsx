import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import { motion } from 'framer-motion';

const BrandStory = ({
  title = 'Our Story',
  subtitle = 'Crafting style since 2020',
  description = [
    'ROXVORA was founded with a simple mission: to make premium fashion accessible to everyone. We believe that looking good shouldn\'t come at the cost of quality or sustainability.',
    'Every piece in our collection is carefully curated from designers and brands that share our values. We prioritize ethical manufacturing, sustainable materials, and timeless designs that transcend seasons.',
    'From our headquarters in the fashion capital, we work tirelessly to bring you the latest trends alongside classic staples that form the foundation of any wardrobe.',
  ],
  image = 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80',
  ctaText = 'Learn More',
  ctaLink = '/about',
  className = '',
}) => {
  return (
    <section className={`py-16 md:py-24 ${className}`} aria-labelledby="brand-story-heading">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative min-w-0">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <img
                src={image}
                alt="Our brand story"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-primary-900/90 to-transparent">
                <div className="flex items-center gap-4 text-white">
                  <div className="w-16 h-16 rounded-full bg-secondary/25 ring-1 ring-secondary/50 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-8 h-8 text-secondary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-secondary font-semibold">10K+</p>
                    <p className="text-sm text-white/80">Happy Customers</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-block px-3 py-1 bg-secondary-50 text-secondary-800 rounded-full text-xs font-semibold uppercase tracking-widest mb-4">
                Our Story
              </span>
              <h2 id="brand-story-heading" className="text-3xl md:text-4xl font-secondary font-semibold text-primary mb-3">
                {title}
              </h2>
              <p className="font-secondary text-xl text-secondary-700 italic mb-6">{subtitle}</p>
              <div className="space-y-4 mb-8">
                {description.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="text-secondary leading-relaxed"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  to={ctaLink}
                  className="btn btn-primary btn-lg group"
                >
                  {ctaText}
                  <FiChevronRight
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  to="/shop"
                  className="btn btn-outline btn-lg"
                >
                  Shop the Collection
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;