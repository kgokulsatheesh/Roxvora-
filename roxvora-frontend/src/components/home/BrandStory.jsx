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
            </div>
        </section>
    );
};

export default BrandStory;
