import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiLayers } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const ARTISAN_PILLARS = [
  {
    num: '01',
    label: 'Architecture',
    heading: 'The Geometry of Drape',
    copy: 'Every piece is conceived with structural precision—anchoring bold, clean lines to the human form while allowing unrestricted fluid movement.',
    visual: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80',
    accent: 'Tailored Mastery',
  },
  {
    num: '02',
    label: 'Botanical Source',
    heading: 'Tactile Weightlessness',
    copy: 'Sourced directly from heritage organic mills, our textiles provide an ethereal second-skin lightness that breathes naturally with the environment.',
    visual: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1200&q=80',
    accent: 'Pure Organic',
  },
  {
    num: '03',
    label: 'Limited Archive',
    heading: 'Individual Identity',
    copy: 'We reject industrial scale. Each collection is strictly restricted in volume, designed to serve as a rare collector statement rather than fleeting wear.',
    visual: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80',
    accent: 'Numbered Series',
  },
];

const BrandStory = () => {
  const [selectedPillar, setSelectedPillar] = useState(0);
  const activeData = ARTISAN_PILLARS[selectedPillar];

  return (
    <section className="py-24 md:py-36 bg-[#FAF7F2] text-neutral-950 relative overflow-hidden" aria-label="Brand narrative">
      <div className="container mx-auto px-6 md:px-12 max-w-[1536px]">
        
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-300/80 pb-10 mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-neutral-300 rounded-full text-[11px] font-semibold uppercase tracking-[0.3em] text-[#9A7B2C] mb-4 shadow-sm">
              <FiLayers className="w-3.5 h-3.5" />
              <span>Sartorial Manifest</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-neutral-950">
              The Art of <span className="text-[#9A7B2C]">Fabrication</span>
            </h2>
          </div>
          <p className="text-neutral-600 text-base font-light max-w-sm">
            Select a pillar below to explore the core design philosophy shaping our collections.
          </p>
        </div>

        {/* Brand New Layout: Minimalist Horizontal Switcher with Dynamic Canvas Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side: Interactive Selector Deck */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {ARTISAN_PILLARS.map((item, index) => {
              const isSelected = selectedPillar === index;
              return (
                <div
                  key={item.num}
                  onClick={() => setSelectedPillar(index)}
                  className={`p-6 sm:p-8 rounded-[2.5rem] border transition-all duration-500 cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? 'bg-[#1A1816] text-white border-[#1A1816] shadow-xl scale-[1.02]'
                      : 'bg-white/90 text-neutral-900 border-neutral-200 hover:border-neutral-400 shadow-sm'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-mono font-bold tracking-widest ${isSelected ? 'text-[#D4AF37]' : 'text-neutral-400'}`}>
                        {item.num}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${isSelected ? 'bg-white/10 text-white' : 'bg-neutral-100 text-neutral-600'}`}>
                        {item.accent}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold pt-1">
                      {item.heading}
                    </h3>
                  </div>

                  <span className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:rotate-45 ${isSelected ? 'bg-[#D4AF37] text-black' : 'bg-neutral-100 text-neutral-800'}`}>
                    <FiArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right Side: Immersive Canvas Display */}
          <div className="lg:col-span-7 relative rounded-[3rem] overflow-hidden bg-neutral-900 h-[480px] sm:h-[540px] shadow-2xl flex flex-col justify-end p-8 sm:p-12">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeData.num}
                src={activeData.visual}
                alt={activeData.heading}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="relative z-10 text-white space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#F3E5AB]">
                Pillar {activeData.num} — {activeData.label}
              </span>
              <h4 className="text-3xl sm:text-4xl font-serif font-bold">
                {activeData.heading}
              </h4>
              <p className="text-neutral-300 text-sm sm:text-base font-light max-w-xl leading-relaxed">
                {activeData.copy}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default BrandStory;