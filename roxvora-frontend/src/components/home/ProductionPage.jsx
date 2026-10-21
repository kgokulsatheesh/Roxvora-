import React from 'react';
import HeroSection from './HeroSection';
import FeaturedCollections from './FeaturedCollections';
import NewArrivals from "./NewArrivals";
import BestSellers from "./BestSellers";
import CategoryShowcase from './CategoryShowcase';
import PromotionalBanner from './PromotionalBanner';
import BrandStory from './BrandStory';
import InstagramSection from './InstagramSection';
import NewsletterSection from './NewsletterSection';

const ProductionPage = () => {
  return (
    <main className="w-full bg-[#FAF7F2] text-neutral-950 min-h-screen overflow-x-hidden selection:bg-[#D4AF37] selection:text-white">
      {/* 1. Cinematic Hero Entrance */}
      <HeroSection />

      {/* 2. Category Showcase Grid */}
      <CategoryShowcase />

      {/* 3. Featured Collections & Marquees */}
      <FeaturedCollections />
      <NewArrivals />
      <BestSellers />

      {/* 4. Promotional Privileges Bento Grid */}
      <PromotionalBanner />

      {/* 5. Immersive Brand Heritage Chronicle */}
      <BrandStory />

      {/* 6. Social Proof & Newsletter Feed */}
      <InstagramSection />
      <NewsletterSection />
    </main>
  );
};

export default ProductionPage;