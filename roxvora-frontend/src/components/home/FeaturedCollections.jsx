import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import { motion } from 'framer-motion';

const FeaturedCollections = ({
  title = 'Featured Collections',
  subtitle = 'Explore our curated selections',
  collections = [
    {
      id: 1,
      name: "Women's Dresses",
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
      href: '/shop/women',
      productCount: 120,
    },
    {
      id: 2,
      name: "Men's Formal Wear",
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
      href: '/shop/men',
      productCount: 85,
    },
    {
      id: 3,
      name: "Kids' Summer",
      image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&q=80',
      href: '/shop/kids',
      productCount: 60,
    },
    {
      id: 4,
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80',
      href: '/shop/accessories',
      productCount: 200,
    },
  ],
  className = '',
}) => {
  return (
    <section className={`py-16 md:py-24 ${className}`} aria-labelledby="featured-collections-heading">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-secondary-700 mb-3">
            Curated for you
          </span>
          <h2
            id="featured-collections-heading"
            className="text-3xl md:text-4xl font-secondary font-semibold text-primary mb-4"
          >
            {title}
          </h2>
          <p className="text-secondary text-lg">{subtitle}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {collections.map((collection, index) => (
            <motion.article
              key={collection.id}
              initial={{ y: 28, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <Link
                to={collection.href}
                className="block h-full w-full"
                aria-label={`View ${collection.name} collection, ${collection.productCount} products`}
              >
                <img
                  src={collection.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                  aria-hidden="true"
                />

                {/* Base scrim keeps the label readable; deepens on hover */}
                <span
                  className="absolute inset-0 bg-gradient-to-t from-primary-900/85 via-primary-900/25 to-transparent"
                  aria-hidden="true"
                />
                <span
                  className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/40 transition-colors duration-500"
                  aria-hidden="true"
                />

                <span className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white">
                  <span className="block text-lg md:text-xl font-secondary font-semibold mb-1 leading-tight">
                    {collection.name}
                  </span>
                  <span className="block text-xs text-white/70">{collection.productCount} products</span>
                  <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-secondary-200">
                    Shop Now
                    <FiChevronRight
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </span>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="btn btn-outline btn-lg group inline-flex items-center gap-2"
          >
            View All Collections
            <FiChevronRight
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
