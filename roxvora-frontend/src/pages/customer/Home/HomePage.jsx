import HeroSection from '@components/home/HeroSection';
import FeaturedCollections from '@components/home/FeaturedCollections';
import { NewArrivals, BestSellers } from '@components/home/ProductSection';
import CategoryShowcase from '@components/home/CategoryShowcase';
import PromotionalBanner from '@components/home/PromotionalBanner';
import BrandStory from '@components/home/BrandStory';
import InstagramSection from '@components/home/InstagramSection';
import NewsletterSection from '@components/home/NewsletterSection';
import { useSelector } from 'react-redux';
import { selectProducts } from '@store/slices/productSlice';

const HomePage = () => {
  const products = useSelector(selectProducts);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 8);
  const bestSellers = products.filter((p) => p.isBestseller).slice(0, 8);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedCollections />
      <PromotionalBanner />
      <NewArrivals title="New Arrivals" subtitle="Fresh styles just landed" products={newArrivals} viewAllLink="/shop/new" />
      <BestSellers title="Best Sellers" subtitle="Our most loved products" products={bestSellers} viewAllLink="/shop/best-sellers" />
      <CategoryShowcase />
      <BrandStory />
      <InstagramSection />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;