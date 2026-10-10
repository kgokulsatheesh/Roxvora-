import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, IconButton } from '@mui/material';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_SLIDES = [
  {
    id: 1,
    eyebrow: 'The Spring Edit 2026',
    title: 'Timeless Elegance Redefined',
    description: 'Fresh architectural silhouettes and lightweight Italian fabrics crafted for the modern wardrobe.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80',
    ctaText: 'Discover Collection',
    ctaLink: '/shop/new',
  },
  {
    id: 2,
    eyebrow: 'Warm Weather Atelier',
    title: 'Effortless Summer Sophistication',
    description: 'Breathable pure linens, sun-kissed neutrals, and fluid drapes designed for long sunlit days.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80',
    ctaText: 'Explore Essentials',
    ctaLink: '/shop/women',
  },
  {
    id: 3,
    eyebrow: 'Private Seasonal Privilege',
    title: 'Exquisite Curated Reductions',
    description: 'Acquire signature handcrafted leather accessories, fine jewellery, and seasonal pieces at exceptional value.',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1920&q=80',
    ctaText: 'Access Privilege',
    ctaLink: '/shop/sale',
  },
  {
    id: 4,
    eyebrow: 'Evening & Occasion',
    title: 'Captivating Nightfall Couture',
    description: 'Make an unforgettable impression with rich textures, shimmering embroidery, and dramatic floor-sweeping cuts.',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1920&q=80',
    ctaText: 'Shop Eveningwear',
    ctaLink: '/shop/evening',
  },
  {
    id: 5,
    eyebrow: 'Tailored Mastery',
    title: 'Modern Power & Precision',
    description: 'Sharp blazers, structured trousers, and immaculate tailoring engineered for effortless authority.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1920&q=80',
    ctaText: 'Explore Tailoring',
    ctaLink: '/shop/tailored',
  },
];

const HeroSection = ({
  slides = DEFAULT_SLIDES,
  autoPlay = true,
  autoPlayInterval = 3000,
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

  const markInteraction = useCallback(() => {
    setAutoplayKey((key) => key + 1);
  }, []);

  // useEffect(() => {
  //   isFocusPausedRef.current = isFocusPaused;
  // }, [isFocusPaused]);

  // useEffect(() => {
  //   if (!autoPlay) return undefined;
  //   const id = setInterval(() => {
  //     if (document.hidden || isFocusPausedRef.current) return;
  //     paginate(1);
  //   }, autoPlayInterval);
  //   return () => clearInterval(id);
  // }, [autoPlay, autoPlayInterval, paginate, autoplayKey]);

  const active = slides[currentSlide];

  // Silky smooth transition animation curve
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      scale: 1.05,
      opacity: 0,
    }),
    center: {
      x: 0,
      scale: 1,
      opacity: 1,
      transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (dir) => ({
      x: dir < 0 ? '100%' : '-100%',
      scale: 1.02,
      opacity: 0,
      transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const containerVariants = {
    enter: { opacity: 0 },
    center: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    enter: { opacity: 0, y: 30, filter: 'blur(4px)' },
    center: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
    exit: { opacity: 0, y: -15, filter: 'blur(4px)', transition: { duration: 0.3 } },
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

  const onClickCapture = (e) => {
    if (!suppressClick.current) return;
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Box
      component="section"
      className={`relative overflow-hidden bg-[#111] ${className}`}
      style={{ touchAction: 'pan-y' }}
      aria-label="Luxury Featured Collections Carousel"
      aria-roledescription="carousel"
      onFocusCapture={() => setIsFocusPaused(true)}
      onBlurCapture={() => setIsFocusPaused(false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onClickCapture={onClickCapture}
    >
      {/* Expanded height bounds to allow full panoramic banner view on desktops */}
      <Box className="relative h-[85vh] sm:h-[88vh] min-h-[620px] max-h-[980px] w-full flex items-center">
        
        {/* Background Image Carousel Slider */}
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={active.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 z-0 will-change-transform"
            style={{
              backgroundImage: `url(${active.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
            }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${currentSlide + 1} of ${slides.length}: ${active.title}`}
          />
        </AnimatePresence>

        {/* Seamless Soft Vignette (Balanced for full image visibility and pristine text readability) */}
        <Box className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10 w-full lg:w-2/3" />
        <Box className="absolute inset-0 bg-black/20 z-10" />

        {/* Fully Responsive Fluid Container */}
        <Container maxWidth={false} className="relative z-20 h-full flex items-center px-6 sm:px-12 lg:px-24 max-w-[1536px] mx-auto">
          <Box className="w-full max-w-2xl text-left py-12">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={active.id}
                custom={direction}
                variants={containerVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col items-start"
              >
                {/* Luxury Gold-Tinted Eyebrow Badge */}
                <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
                  <Typography
                    component="span"
                    className="inline-block px-4 sm:px-5 py-1.5 sm:py-2 bg-black/50 border border-[#D4AF37]/50 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#E5C568] backdrop-blur-md shadow-2xl"
                  >
                    {active.eyebrow}
                  </Typography>
                </motion.div>

                {/* Bold Fluid Responsive Heading */}
                <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
                  <Typography
                    variant="h1"
                    className="font-serif font-bold text-white drop-shadow-md tracking-tight"
                    style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.8rem)', lineHeight: '1.08' }}
                  >
                    {active.title}
                  </Typography>
                </motion.div>

                {/* Refined Description */}
                <motion.div variants={itemVariants} className="mb-8 sm:mb-10">
                  <Typography
                    variant="body1"
                    className="text-sm sm:text-base lg:text-lg text-neutral-200/95 max-w-xl leading-relaxed font-light tracking-wide drop-shadow"
                  >
                    {active.description}
                  </Typography>
                </motion.div>

                {/* Responsive Action Buttons */}
                <motion.div variants={itemVariants} className="w-full sm:w-auto">
                  <Box className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                    <Button
                      component={Link}
                      to={active.ctaLink}
                      variant="contained"
                      size="large"
                      className="bg-[#D4AF37] hover:bg-[#C59B27] text-black px-8 py-3.5 sm:py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                      {active.ctaText}
                      <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                    
                    <Button
                      component={Link}
                      to="/shop"
                      variant="outlined"
                      size="large"
                      className="border-white/50 text-white hover:bg-white hover:text-black px-8 py-3.5 sm:py-4 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm transition-all duration-300 flex items-center justify-center"
                    >
                      View Collections
                    </Button>
                  </Box>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </Box>
        </Container>

        {/* Navigation Arrows */}
        {showArrows && (
          <>
            <IconButton
              onClick={() => {
                paginate(-1);
                markInteraction();
              }}
              aria-label="Previous slide"
              className="absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/70 text-white border border-white/20 backdrop-blur-md transition-all p-3.5 hidden md:flex shadow-xl"
            >
              <FiChevronLeft className="w-5 h-5" />
            </IconButton>
            <IconButton
              onClick={() => {
                paginate(1);
                markInteraction();
              }}
              aria-label="Next slide"
              className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/70 text-white border border-white/20 backdrop-blur-md transition-all p-3.5 hidden md:flex shadow-xl"
            >
              <FiChevronRight className="w-5 h-5" />
            </IconButton>
          </>
        )}

        {/* Indicators */}
        {showIndicators && (
          <Box
            className="absolute bottom-6 sm:bottom-8 left-6 sm:left-12 lg:left-24 z-30 flex items-center gap-2.5 sm:gap-3"
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
                className={`h-1.5 rounded-full transition-all duration-700 ${
                  index === currentSlide
                    ? 'w-10 sm:w-12 bg-[#D4AF37]'
                    : 'w-3 sm:w-4 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HeroSection;