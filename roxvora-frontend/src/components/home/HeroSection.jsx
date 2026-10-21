import { Link } from 'react-router-dom';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_SLIDES = [
  {
    id: 1,
    eyebrow: 'The Spring Edit',
    title: 'Spring Collection 2026',
    description: 'Fresh silhouettes and lightweight fabrics for the new season. Dresses, tops and accessories.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80',
    ctaText: 'Shop Now',
    ctaLink: '/shop/new',
  },
  {
    id: 2,
    eyebrow: 'Warm Weather',
    title: 'Summer Essentials',
    description: 'Breathable linens, sun-ready shades and easy fits crafted for long summer days.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80',
    ctaText: 'Explore',
    ctaLink: '/shop/women',
  },
  {
    id: 3,
    eyebrow: 'Season Sale',
    title: 'Up to 50% Off',
    description: 'Complete your look with bags, jewellery and accessories at reduced prices.',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1920&q=80',
    ctaText: 'Shop Sale',
    ctaLink: '/shop/sale',
  },
];

const HeroSection = ({
  slides = DEFAULT_SLIDES,
  autoPlay = true,
  autoPlayInterval = 6000,
  showArrows = true,
  showIndicators = true,
  className = '',
}) => {
  const [[currentSlide, direction], setSlide] = useState([0, 1]);
  const [isFocusPaused, setIsFocusPaused] = useState(false);
  const [autoplayKey, setAutoplayKey] = useState(0);
  const isFocusPausedRef = useRef(false);
  const drag = useRef({ active: false, x: 0, y: 0, horizontal: false });
  const suppressClick = useRef(false);

  const paginate = useCallback(
    (delta) => {
      setSlide(([prev]) => [(prev + delta + slides.length) % slides.length, delta]);
    },
    [slides.length]
  );

  const goTo = useCallback(
    (index) => {
      setSlide(([prev]) => (index === prev ? [prev, 1] : [index, index > prev ? 1 : -1]));
    },
    []
  );

  // Restart the autoplay countdown after any manual navigation.
  const markInteraction = useCallback(() => {
    setAutoplayKey((key) => key + 1);
  }, []);

  useEffect(() => {
    isFocusPausedRef.current = isFocusPaused;
  }, [isFocusPaused]);

  useEffect(() => {
    if (!autoPlay) return undefined;
    const id = setInterval(() => {
      if (document.hidden || isFocusPausedRef.current) return;
      paginate(1);
    }, autoPlayInterval);
    return () => clearInterval(id);
  }, [autoPlay, autoPlayInterval, paginate, autoplayKey]);

  const active = slides[currentSlide];

  const slideVariants = {
    enter: { opacity: 0, scale: 1.08 },
    center: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, scale: 1.02, transition: { duration: 0.5, ease: 'easeIn' } },
  };

  const contentVariants = {
    enter: { opacity: 0, y: 28 },
    center: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] },
    },
    exit: { opacity: 0, y: -18, transition: { duration: 0.3 } },
  };

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    drag.current = { active: true, x: e.clientX, y: e.clientY, horizontal: false };
  };

  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    if (!drag.current.horizontal && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
      drag.current.horizontal = true;
    }
  };

  const onPointerUp = (e) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.x;
    const wasHorizontal = drag.current.horizontal;
    drag.current = { active: false, x: 0, y: 0, horizontal: false };
    if (!wasHorizontal || Math.abs(dx) <= 50) return;
    suppressClick.current = true;
    paginate(dx < 0 ? 1 : -1);
    markInteraction();
    window.setTimeout(() => {
      suppressClick.current = false;
    }, 400);
  };

  const onPointerCancel = () => {
    drag.current = { active: false, x: 0, y: 0, horizontal: false };
  };

  // Swallow the click that a swipe leaves behind, so a swipe never opens a link.
  const onClickCapture = (e) => {
    if (!suppressClick.current) return;
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <section
      className={`relative overflow-hidden bg-primary-900 ${className}`}
      style={{ touchAction: 'pan-y' }}
      aria-label="Featured collections"
      aria-roledescription="carousel"
      onFocusCapture={() => setIsFocusPaused(true)}
      onBlurCapture={() => setIsFocusPaused(false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onClickCapture={onClickCapture}
    >
      <div className="relative h-[78vh] min-h-[520px] max-h-[820px] w-full">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={active.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
            style={{ backgroundImage: `url(${active.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${currentSlide + 1} of ${slides.length}: ${active.title}`}
          />
        </AnimatePresence>

        {/* Cinematic overlays — dark enough for reliable contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-900/55 to-primary-900/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-transparent to-primary-900/30" />

        <div className="relative h-full container mx-auto px-4 md:px-8 flex items-center">
          <div className="w-full max-w-2xl text-white">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={active.id}
                custom={direction}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-secondary/50 rounded-full text-xs font-semibold uppercase tracking-widest text-secondary-200 backdrop-blur-sm mb-6">
                  {active.eyebrow}
                </span>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-secondary font-semibold leading-[1.05] mb-5 text-white">
                  {active.title}
                </h1>

                <p className="text-base md:text-lg text-white/75 mb-9 max-w-lg leading-relaxed">
                  {active.description}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to={active.ctaLink}
                    className="btn btn-primary btn-lg group inline-flex items-center gap-2"
                  >
                    {active.ctaText}
                    <FiArrowRight
                      className="w-5 h-5 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                  <Link
                    to="/shop"
                    className="btn btn-outline btn-lg !border-white/40 !text-white hover:!bg-white hover:!text-primary-900"
                  >
                    Browse All
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {showArrows && (
          <>
            <button
              type="button"
              className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 btn btn-icon-lg rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-colors inline-flex"
              onClick={() => {
                paginate(-1);
                markInteraction();
              }}
              aria-label="Previous slide"
            >
              <FiChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 btn btn-icon-lg rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-colors inline-flex"
              onClick={() => {
                paginate(1);
                markInteraction();
              }}
              aria-label="Next slide"
            >
              <FiChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </>
        )}

        {showIndicators && (
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3"
            role="tablist"
            aria-label="Choose slide"
          >
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={index === currentSlide}
                aria-label={slide.title}
                onClick={() => {
                  goTo(index);
                  markInteraction();
                }}
                className={`h-1 rounded-full transition-all duration-500 ${
                  index === currentSlide
                    ? 'w-10 bg-secondary'
                    : 'w-5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
