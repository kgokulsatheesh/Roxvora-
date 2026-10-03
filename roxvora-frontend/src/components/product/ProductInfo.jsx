import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { appConfig } from '@config/appConfig';
import { buildSeedReviews, selectUserReviews } from '@store/slices/reviewSlice';
import Price from '@components/common/Price/Price';
import Rating from '@components/common/Rating/Rating';
import Badge from './ProductBadge';
import SizeSelector from './SizeSelector';
import ColorSelector from './ColorSelector';
import QuantitySelector from './QuantitySelector';
import StockStatus from './StockStatus';
import ProductReviews from './ProductReviews';
import AddToCartButton from './AddToCartButton';
import WishlistButton from './WishlistButton';
import { FiTruck, FiRotateCcw, FiShield, FiPackage, FiRefreshCw, FiShare2 } from 'react-icons/fi';


const ProductInfo = ({
  product,
  selectedSize,
  selectedColor,
  quantity,
  onSizeChange,
  onColorChange,
  onQuantityChange,
  onAddToCart,
  onBuyNow,
  onWishlistToggle,
  isLoading = false,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState('description');
  const userReviews = useSelector((state) => selectUserReviews(state, product.id));
  const reviews = useMemo(
    () => [...userReviews, ...buildSeedReviews(product.id)],
    [userReviews, product.id]
  );
  const reviewCount = reviews.length;

  const descriptionFacts = [
    { label: 'SKU', value: product.sku || '—' },
    { label: 'Category', value: product.category || '—' },
    {
      label: 'Colours',
      value: product.colors?.length ? `${product.colors.length} available` : '—',
    },
    { label: 'Sizes', value: product.sizes?.length ? product.sizes.join(', ') : '—' },
  ];

  const specifications = [
    ...(product.specifications || []),
    { name: 'Style code', value: product.sku || '—' },
    { name: 'Category', value: product.category || '—' },
    { name: 'Available sizes', value: product.sizes?.join(', ') || '—' },
    {
      name: 'Available colours',
      value: product.colors?.map((color) => color.name).join(', ') || '—',
    },
    {
      name: 'Availability',
      value: product.stock > 0 ? `In stock (${product.stock} left)` : 'Out of stock',
    },
  ];

  const jumpToReviews = () => {
    setActiveTab('reviews');
    window.requestAnimationFrame(() => {
      document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const { freeShippingThreshold, defaultShipping } = appConfig.cart;
  const freeShippingLabel = `Free Shipping on orders over \u20B9${freeShippingThreshold.toLocaleString('en-IN')}`;

  const tabs = [
    { id: 'description', label: 'Description', icon: null },
    { id: 'specifications', label: 'Specifications', icon: null },
    { id: 'reviews', label: `Reviews (${reviewCount})`, icon: null },
    { id: 'shipping', label: 'Shipping & Returns', icon: null },
  ];

  const features = [
    { icon: FiTruck, title: 'Free Shipping', description: `On orders over \u20B9${freeShippingThreshold.toLocaleString('en-IN')}` },
    { icon: FiRotateCcw, title: 'Easy Returns', description: '30-day return policy' },
    { icon: FiShield, title: 'Secure Payment', description: '100% secure checkout' },
    { icon: FiPackage, title: 'Express Delivery', description: `From \u20B9${defaultShipping}` },
  ];

  const badges = [];
  if (product.isNew) badges.push({ label: 'New', variant: 'primary' });
  if (product.isSale) badges.push({ label: 'Sale', variant: 'secondary' });
  if (product.isBestseller) badges.push({ label: 'Bestseller', variant: 'success' });
  if (product.discountPercent > 0) badges.push({ label: `-${product.discountPercent}%`, variant: 'error' });

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3" aria-label="Product badges">
              {badges.map((badge, index) => (
                <Badge key={index} {...badge} size="sm" />
              ))}
            </div>
          )}

          {product.category && (
            <p className="text-sm font-medium text-secondary uppercase tracking-wider mb-2">
              {product.category}
            </p>
          )}

          <h1 className="text-3xl md:text-4xl font-secondary font-bold text-primary mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-4">
            {product.rating && (
              <Rating value={product.rating} max={5} size="md" readonly showLabel />
            )}
{product.reviewCount && (
                <button
                  type="button"
                  onClick={jumpToReviews}
                  className="text-sm text-secondary hover:text-primary transition-colors"
                >
                  ({reviewCount || product.reviewCount} reviews)
                </button>
              )}
          </div>

          <Price
            current={product.price}
            original={product.originalPrice}
            className="text-3xl font-bold"
          />
        </div>

        <WishlistButton
          product={product}
          onClick={onWishlistToggle}
          className="flex-shrink-0"
        />
      </div>

      {product.colors?.length > 0 && (
        <ColorSelector
          colors={product.colors}
          selectedColor={selectedColor}
          onChange={onColorChange}
          className="mb-6"
        />
      )}

      <div className="border-t border-b py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="font-medium text-primary">{feature.title}</p>
                <p className="text-sm text-secondary">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <SizeSelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          onChange={onSizeChange}
        />

        <QuantitySelector
          value={quantity}
          onChange={onQuantityChange}
          max={product.stock}
          min={1}
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <AddToCartButton
            onClick={onAddToCart}
            isLoading={isLoading}
            disabled={!selectedSize || product.stock === 0}
            className="sm:flex-1"
            fullWidth={false}
          />
          <AddToCartButton
            onClick={onBuyNow}
            disabled={!selectedSize || product.stock === 0}
            variant="secondary"
            fullWidth={false}
            className="sm:flex-1"
          >
            Buy Now
          </AddToCartButton>
        </div>

        <StockStatus stock={product.stock} />
      </div>

      <div className="border-t pt-6">
        <button
          type="button"
          className="btn btn-ghost btn-icon w-full justify-center gap-2"
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: product.name, url: window.location.href });
            } else {
              navigator.clipboard?.writeText(window.location.href);
            }
          }}
        >
          <FiShare2 className="w-5 h-5" aria-hidden="true" />
          Share
        </button>
      </div>

      <div className="border-t pt-6">
        <nav
          className="flex gap-1 overflow-x-auto border-b border-neutral-200 xl:grid xl:grid-cols-4 xl:gap-0"
          role="tablist"
          aria-label="Product details"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`${tab.id}-panel`}
              id={`${tab.id}-tab`}
              onClick={() => setActiveTab(tab.id)}
              title={tab.label}
              className={`min-w-0 shrink-0 truncate px-4 py-3.5 text-[0.9375rem] transition-colors duration-200 -mb-px border-b-2 xl:px-2 xl:text-center xl:text-sm ${
                activeTab === tab.id
                  ? 'border-secondary text-primary font-semibold'
                  : 'border-transparent font-medium text-ink-soft hover:text-primary hover:border-neutral-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="pt-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'description' && (
                <div id="description-panel" role="tabpanel" aria-labelledby="description-tab">
                  <p className="text-[0.9375rem] leading-7 text-ink-soft max-w-[62ch]">
                    {product.description}
                  </p>
                  <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-neutral-100 pt-6 sm:grid-cols-4">
                    {descriptionFacts.map((fact) => (
                      <div key={fact.label} className="min-w-0">
                        <dt className="text-xs uppercase tracking-[0.14em] text-ink-hint">{fact.label}</dt>
                        <dd className="mt-1.5 text-sm font-medium text-primary">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
              {activeTab === 'specifications' && (
                <div id="specifications-panel" role="tabpanel" aria-labelledby="specifications-tab">
                  <dl className="grid gap-x-10 sm:grid-cols-2">
                    {specifications.map((spec) => (
                      <div
                        key={spec.name}
                        className="flex items-baseline justify-between gap-4 border-b border-neutral-100 py-3.5"
                      >
                        <dt className="text-sm text-ink-soft">{spec.name}</dt>
                        <dd className="text-sm font-medium text-primary text-right">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div id="reviews-panel" role="tabpanel" aria-labelledby="reviews-tab">
                  <ProductReviews product={product} />
                </div>
              )}
              {activeTab === 'shipping' && (
                <div id="shipping-panel" role="tabpanel" aria-labelledby="shipping-tab">
                  <div className="grid gap-6 sm:grid-cols-3 sm:gap-8">
                    <div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-50 text-secondary">
                        <FiTruck className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h4 className="mt-4 font-medium text-primary">Shipping</h4>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">
                        {freeShippingLabel}. Standard delivery 3-5 business days. Express delivery from
                        {' '}\u20B9{defaultShipping}.
                      </p>
                    </div>
                    <div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-50 text-secondary">
                        <FiRefreshCw className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h4 className="mt-4 font-medium text-primary">Returns</h4>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">
                        30-day return policy. Items must be unworn with tags attached.
                      </p>
                    </div>
                    <div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-50 text-secondary">
                        <FiShield className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h4 className="mt-4 font-medium text-primary">Exchanges</h4>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">
                        Free exchanges for size or color within 30 days.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;