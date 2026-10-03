import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import { motion } from 'framer-motion';

const CategoryShowcase = ({
  title = 'Shop by Category',
  subtitle = 'Explore our categories',
  categories = [
    { id: 1, name: 'Women', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80', href: '/shop/women', count: 1200 },
    { id: 2, name: 'Men', image: 'https://images.unsplash.com/photo-1566479179817-c0b5b4b4b1ae?w=400&q=80', href: '/shop/men', count: 800 },
    { id: 3, name: 'Kids', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&q=80', href: '/shop/kids', count: 450 },
    { id: 4, name: 'Accessories', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80', href: '/shop/accessories', count: 600 },
    { id: 5, name: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', href: '/shop/shoes', count: 500 },
    { id: 6, name: 'Sale', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80', href: '/shop/sale', count: 300 },
  ],
  className = '',
}) => {
  return (
    <section className={`py-16 md:py-24 ${className}`} aria-labelledby="category-showcase-heading">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 id="category-showcase-heading" className="text-3xl md:text-4xl font-secondary font-semibold text-primary mb-4">
            {title}
          </h2>
          <p className="text-secondary text-lg">{subtitle}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-6">
          {categories.map((category, index) => (
            <motion.article
              key={category.id}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: (index % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <Link
                to={category.href}
                className="block text-center"
                aria-label={`Shop ${category.name}, ${category.count} products`}
              >
                <span className="relative block aspect-square overflow-hidden rounded-full ring-1 ring-neutral-200 transition-all duration-300 group-hover:ring-2 group-hover:ring-secondary group-hover:shadow-lg">
                  <img
                    src={category.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                    aria-hidden="true"
                  />
                  <span
                    className="absolute inset-0 rounded-full bg-gradient-to-t from-primary-900/80 via-primary-900/20 to-transparent"
                    aria-hidden="true"
                  />
                  <span className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <span className="text-base md:text-lg font-secondary font-semibold leading-tight px-2 text-center">
                      {category.name}
                    </span>
                    <span className="text-[11px] text-white/70 mt-0.5">{category.count} items</span>
                  </span>
                </span>
                <span className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-secondary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Shop
                  <FiChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/shop" className="btn btn-outline btn-lg group inline-flex items-center gap-2">
            View All Categories
            <FiChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;