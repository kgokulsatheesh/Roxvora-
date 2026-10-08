import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * ScrollReveal — wraps any content and animates it into view on scroll.
 *
 * Props:
 *   variant   — 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale'
 *   delay     — seconds (default 0)
 *   duration  — seconds (default 0.65)
 *   once      — animate only once (default true)
 *   threshold — how much of the element must be visible (default 0.12)
 *   className — extra classes forwarded to the wrapper div
 */

const VARIANTS = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
};

const ScrollReveal = ({
  children,
  variant = 'slideUp',
  delay = 0,
  duration = 0.65,
  once = true,
  threshold = 0.12,
  className = '',
  as: Tag = 'div',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const MotionTag = motion[Tag] ?? motion.div;

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={VARIANTS[variant] ?? VARIANTS.slideUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
};

export default ScrollReveal;
