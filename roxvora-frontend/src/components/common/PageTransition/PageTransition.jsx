import { motion } from 'framer-motion';

/**
 * PageTransition — wraps each route's content and plays a smooth
 * fade + slide-up animation when a new page mounts.
 *
 * Drop it around the content of any page, or use it once in MainLayout
 * wrapping <Outlet /> with AnimatePresence keyed to the current pathname.
 */
const pageVariants = {
  initial: {
    opacity: 0,
    y: 18,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -10,
  },
};

const pageTransition = {
  duration: 0.35,
  ease: [0.22, 1, 0.36, 1],
};

const PageTransition = ({ children }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      // Ensure the wrapper never clips overflow during the translate
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
