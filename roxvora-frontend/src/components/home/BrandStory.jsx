import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiCompass, FiShield, FiAward, FiLayers } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const STORY_TABS = [
  {
    id: 'atelier',
    title: 'The Atelier Craft',
    subtitle: 'Bespoke Precision',
    description: 'Every garment undergoes a rigorous 48-step architectural construction process, blending structured Italian wools with hand-finished structural seams.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80',
    highlight: '48-Step Tailoring',
  },
  {
    id: 'sustainability',
    title: 'Conscious Luxury',
    subtitle: 'Organic & Ethical',
    description: 'We partner exclusively with certified ethical mills using 100% biodegradable botanical fibers, ensuring zero compromise on luxury or planetary health.',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1200&q=80',
    highlight: '100% Sustainable',
  },
  {
    id: 'heritage',
    title: 'Timeless Expression',
    subtitle: 'Numbered Editions',
    description: 'Rejecting mass fast-fashion, ROXVORA issues exclusive, numbered micro-collections designed to be treasured as wearable works of art across generations.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80',
    highlight: 'Exclusive Drops',
  },
];

const BrandStory = () => {
  const [activeTab, setActiveTab] = useState(STORY_TABS[0]);

  return (
    <section className="py-28 md:py-44 bg-[#FAF7F2] text-neutral-950 relative overflow-hidden" aria-label="Brand heritage">

      {/* Soft Ambient Cream & Gold Glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#9A7B2C]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#E6DFD5]/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-neutral-300/80 pb-12 mb-16 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-white border border-neutral-300 rounded-full text-[11px] font-semibold uppercase tracking-[0.3em] text-[#9A7B2C] mb-6 shadow-sm backdrop-blur-md"
            >
              <FiCompass className="w-3.5 h-3.5" />
              <span>Immersive Heritage 2026</span>
            </motion.div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-neutral-950 leading-[1.05]">
              The Anatomy of <span className="text-[#9A7B2C]">ROXVORA</span>
            </h2>
          </div>
          <p className="text-neutral-600 text-base sm:text-lg font-light max-w-md leading-relaxed">
            Explore the pillars of uncompromising craftsmanship, sustainable innovation, and timeless sartorial architecture.
          </p>
        </div>

        {/* Interactive Luxury Cream Tab Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {STORY_TABS.map((tab) => {
            const isActive = activeTab.id === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab)}
                className={`text-left p-6 sm:p-8 rounded-[2.5rem] border transition-all duration-500 cursor-pointer relative overflow-hidden group ${isActive
                    ? 'bg-white border-[#9A7B2C] shadow-[0_20px_50px_rgba(154,123,44,0.12)] ring-1 ring-[#9A7B2C]/40 scale-[1.02]'
                    : 'bg-white/60 border-neutral-200/80 hover:bg-white hover:border-neutral-300 text-neutral-600 hover:text-neutral-950 shadow-sm'
                  }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-[0.25em] ${isActive ? 'text-[#9A7B2C]' : 'text-neutral-400'}`}>
                    {tab.subtitle}
                  </span>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-transform group-hover:rotate-45 ${isActive ? 'bg-[#9A7B2C] text-white font-bold' : 'bg-neutral-100 text-neutral-800'}`}>
                    <FiArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
                <h3 className={`text-xl sm:text-2xl font-serif font-bold ${isActive ? 'text-neutral-950' : 'text-neutral-800'}`}>
                  {tab.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Dynamic Ivory Display Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white/90 backdrop-blur-xl border border-neutral-200/80 rounded-[3rem] p-6 sm:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.06)] overflow-hidden relative">

          {/* Left: Cinematic Animated Image Display */}
          <div className="lg:col-span-7 relative rounded-[2.5rem] overflow-hidden aspect-[16/10] lg:aspect-[16/11] bg-neutral-100 shadow-xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeTab.id}
                src={activeTab.image}
                alt={activeTab.title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Floating Highlight Pill */}
            <div className="absolute bottom-6 left-6 z-20">
              <span className="px-5 py-2 bg-white/90 backdrop-blur-md border border-white/40 rounded-full text-xs font-bold uppercase tracking-widest text-neutral-900 shadow-lg">
                ✦ {activeTab.highlight}
              </span>
            </div>
          </div>

          {/* Right: Dynamic Narrative Content */}
          <div className="lg:col-span-5 flex flex-col justify-center py-4 lg:py-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9A7B2C] block mb-3">
                  {activeTab.subtitle}
                </span>
                <h3 className="text-3xl sm:text-5xl font-serif font-bold text-neutral-950 mb-6 leading-tight">
                  {activeTab.title}
                </h3>
                <p className="text-neutral-600 text-base sm:text-lg font-light leading-relaxed mb-8">
                  {activeTab.description}
                </p>

                <div className="flex items-center gap-6">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-neutral-950 text-white hover:bg-[#9A7B2C] hover:text-black text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-xl group"
                  >
                    <span>Read Full Chronicle</span>
                    <FiArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

export default BrandStory;