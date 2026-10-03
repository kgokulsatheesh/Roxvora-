import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiChevronRight } from 'react-icons/fi';

import CONTENT from './infoContent';

const InfoPage = () => {
  const { slug } = useParams();
  const content = CONTENT[slug];

  if (!content) return null;

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-primary-900">
        <div className="container mx-auto px-4 md:px-8 py-14 md:py-20">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
            <FiChevronRight className="w-4 h-4" aria-hidden="true" />
            <span className="text-white">{content.title}</span>
          </nav>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-secondary font-semibold text-white"
          >
            {content.title}
          </motion.h1>
          <p className="mt-3 text-white/60 text-lg">{content.subtitle}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-14 md:py-20">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl"
        >
          <div className="space-y-5">
            {content.body.map((paragraph, index) => (
              <p key={index} className="text-secondary leading-relaxed text-base">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t flex flex-wrap gap-3">
            <Link to="/shop" className="btn btn-primary">
              Start Shopping
              <FiChevronRight className="w-5 h-5" aria-hidden="true" />
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InfoPage;
