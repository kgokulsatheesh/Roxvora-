import HeroSection from "../../../components/home/HeroSection";
import FeaturedCollections from "../../../components/home/FeaturedCollections";
import { NewArrivals, BestSellers } from "../../../components/home/ProductSection";
import CategoryShowcase from "../../../components/home/CategoryShowcase";
import PromotionalBanner from "../../../components/home/PromotionalBanner";
import BrandStory from "../../../components/home/BrandStory";
import InstagramSection from "../../../components/home/InstagramSection";
import NewsletterSection from "../../../components/home/NewsletterSection";
import ScrollReveal from "../../../components/ui/ScrollReveal";
import { useSelector } from 'react-redux';
import { selectProducts } from '@store/slices/productSlice';

const HomePage = () => {
  const products = useSelector(selectProducts);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 8);
  const bestSellers = products.filter((p) => p.isBestseller).slice(0, 8);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero is above-the-fold — no scroll reveal needed */}
      <HeroSection />

      {/* Each section slides up as it enters the viewport */}
      <ScrollReveal variant="slideUp" delay={0}>
        <FeaturedCollections />
      </ScrollReveal>

      <ScrollReveal variant="slideUp" delay={0}>
        <PromotionalBanner />
      </ScrollReveal>

      <ScrollReveal variant="slideUp" delay={0}>
        <NewArrivals
          title="New Arrivals"
          subtitle="Fresh styles just landed"
          products={newArrivals}
          viewAllLink="/shop/new"
        />
      </ScrollReveal>

      <ScrollReveal variant="slideUp" delay={0}>
        <BestSellers
          title="Best Sellers"
          subtitle="Our most loved products"
          products={bestSellers}
          viewAllLink="/shop/best-sellers"
        />
      </ScrollReveal>

      <ScrollReveal variant="slideUp" delay={0}>
        <CategoryShowcase />
      </ScrollReveal>

      {/* BrandStory gets a horizontal slide for visual variety */}
      <ScrollReveal variant="fade" delay={0}>
        <BrandStory />
      </ScrollReveal>

      <ScrollReveal variant="slideUp" delay={0}>
        <InstagramSection />
      </ScrollReveal>

      <ScrollReveal variant="scale" delay={0}>
        <NewsletterSection />
      </ScrollReveal>
    </div>
  );
};

export default HomePage;
