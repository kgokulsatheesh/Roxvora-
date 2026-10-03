import { Link } from 'react-router-dom';
import FooterLinks from './FooterLinks';
import Newsletter from './Newsletter';
import SocialLinks from './SocialLinks';

const Footer = () => {
  return (
    <footer className="bg-primary-900 text-white pt-16 pb-8" role="contentinfo">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4" aria-label="ROXVORA Home">
              <span className="text-2xl font-secondary font-bold tracking-[0.2em]">ROXVORA</span>
            </Link>
            <p className="text-xs uppercase tracking-widest text-secondary mb-4">Own the Look</p>
            <p className="text-white/60 text-base max-w-xs mb-6 leading-relaxed">
              Premium fashion &amp; lifestyle destination. Discover curated collections of clothing, accessories, and more.
            </p>
            <SocialLinks />
          </div>

          <FooterLinks
            title="Shop"
            links={[
              { label: 'New Arrivals', href: '/shop/new' },
              { label: 'Best Sellers', href: '/shop/best-sellers' },
              { label: 'Women', href: '/shop/women' },
              { label: 'Men', href: '/shop/men' },
              { label: 'Kids', href: '/shop/kids' },
              { label: 'Accessories', href: '/shop/accessories' },
              { label: 'Sale', href: '/shop/sale' },
            ]}
          />

          <FooterLinks
            title="Support"
            links={[
              { label: 'Contact Us', href: '/contact' },
              { label: 'FAQs', href: '/faq' },
              { label: 'Shipping Info', href: '/shipping' },
              { label: 'Returns & Exchanges', href: '/returns' },
              { label: 'Size Guide', href: '/size-guide' },
              { label: 'Track Order', href: '/track-order' },
            ]}
          />

          <FooterLinks
            title="Company"
            links={[
              { label: 'About Us', href: '/about' },
              { label: 'Careers', href: '/careers' },
              { label: 'Press', href: '/press' },
              { label: 'Sustainability', href: '/sustainability' },
              { label: 'Blog', href: '/blog' },
              { label: 'Affiliate Program', href: '/affiliate' },
            ]}
          />
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="text-center md:text-left">
              <p className="text-white/50 text-sm">
                &copy; {new Date().getFullYear()} ROXVORA. All rights reserved.
              </p>
            </div>

            <Newsletter />

            <div className="text-center md:text-right">
              <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm text-white/50">
                <Link to="/privacy" className="hover:text-secondary transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-secondary transition-colors">Terms of Service</Link>
                <Link to="/cookies" className="hover:text-secondary transition-colors">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;