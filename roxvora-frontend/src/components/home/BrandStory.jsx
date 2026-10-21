import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const BrandStory = ({ className = '' }) => {
    return (
        <section
            className={`py-16 md:py-24 bg-neutral-50 ${className}`}
            aria-labelledby="brand-story-heading"
        >
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image side */}
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-200">
                            <img
                                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80"
                                alt="ROXVORA atelier — a craftsperson at a sewing table"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                        {/* Floating accent card */}
                        <div className="absolute -bottom-6 -right-4 md:-right-8 bg-white rounded-xl shadow-lg px-6 py-5 max-w-[220px]">
                            <p className="text-4xl font-secondary font-bold text-primary leading-none">12+</p>
                            <p className="text-sm text-secondary mt-1">Years crafting premium fashion</p>
                        </div>
                    </motion.div>

                    {/* Text side */}
                    <motion.div
                        initial={{ x: 30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-secondary-700 mb-4">
                            Our Story
                        </span>
                        <h2
                            id="brand-story-heading"
                            className="text-3xl md:text-4xl lg:text-5xl font-secondary font-semibold text-primary leading-tight mb-6"
                        >
                            Fashion with purpose, crafted with care
                        </h2>
                        <p className="text-secondary text-lg leading-relaxed mb-5">
                            ROXVORA was built on a simple belief — that premium fashion should be accessible, sustainable, and made to last. Every piece in our collection is thoughtfully sourced from designers who share our commitment to quality.
                        </p>
                        <p className="text-secondary leading-relaxed mb-8">
                            From ethical manufacturing partners to eco-conscious packaging, we make deliberate choices at every step so you can feel good about what you wear.
                        </p>

<<<<<<< HEAD
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
=======
                        <div className="flex flex-wrap gap-8 mb-10">
                            {[
                                { stat: '500+', label: 'Curated styles' },
                                { stat: '50K+', label: 'Happy customers' },
                                { stat: '100%', label: 'Ethical sourcing' },
                            ].map(({ stat, label }) => (
                                <div key={label}>
                                    <p className="text-3xl font-secondary font-bold text-primary">{stat}</p>
                                    <p className="text-sm text-secondary mt-1">{label}</p>
                                </div>
                            ))}
                        </div>

                        <Link
                            to="/about"
                            className="btn btn-primary btn-lg group inline-flex items-center gap-2"
                        >
                            Learn Our Story
                            <FiArrowRight
                                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                                aria-hidden="true"
                            />
                        </Link>
                    </motion.div>
                </div>
>>>>>>> parent of 9059003 (20-10-2026 tuesday-frontend)
            </div>
        </section>
    );
};

export default BrandStory;
