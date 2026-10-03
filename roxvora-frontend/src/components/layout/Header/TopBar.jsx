import { FiTruck, FiRotateCcw, FiShield, FiHeadphones } from 'react-icons/fi';

import { appConfig } from '@config/appConfig';

const TopBar = () => {
  const features = [
    { icon: FiTruck, label: 'Free Shipping', description: `On orders over \u20B9${appConfig.cart.freeShippingThreshold}` },
    { icon: FiRotateCcw, label: 'Easy Returns', description: '30-day return policy' },
    { icon: FiShield, label: 'Secure Payment', description: '100% secure checkout' },
    { icon: FiHeadphones, label: '24/7 Support', description: 'Dedicated support' },
  ];

  return (
    <div className="bg-primary-900 text-white hidden md:block" role="region" aria-label="Store benefits">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 py-2 text-xs">
          {features.map(({ icon: Icon, label, description }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-secondary" aria-hidden="true" />
              <span className="font-medium">{label}</span>
              <span className="text-white/60 hidden sm:inline">&mdash; {description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
