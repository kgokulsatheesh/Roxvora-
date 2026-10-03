import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategoryCard = ({
  category,
  variant = 'default',
  className = '',
}) => {
  const variants = {
    default: 'card group overflow-hidden aspect-[4/3]',
    square: 'card group overflow-hidden aspect-square',
    wide: 'card group overflow-hidden aspect-[16/9]',
    compact: 'card group overflow-hidden aspect-[3/4]',
  };

  return (
    <motion.article
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      className={`${variants[variant]} ${className}`}
    >
      <Link to={category.href} className="block h-full" aria-label={`Shop ${category.name}`}>
        <div className="relative h-full">
          <img
            src={category.image}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-lg font-semibold mb-1">{category.name}</h3>
            <p className="text-sm opacity-90">{category.count} products</p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default CategoryCard;