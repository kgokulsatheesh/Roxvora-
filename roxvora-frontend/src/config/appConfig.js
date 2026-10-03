import { env } from './env';

const CURRENCY_SYMBOL = '\u20B9';
const FREE_SHIPPING_THRESHOLD = 999;

export const appConfig = {
  name: env.appName,
  url: env.appUrl,
  currency: 'INR',
  currencySymbol: CURRENCY_SYMBOL,
  locale: 'en-IN',
  dateFormat: 'MMMM D, YYYY',
  dateTimeFormat: 'MMMM D, YYYY h:mm A',
  
  pagination: {
    defaultPerPage: 20,
    maxPerPage: 100,
  },

  products: {
    maxImages: 10,
    maxVariants: 50,
    maxTags: 20,
  },

  cart: {
    maxQuantity: 99,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    defaultShipping: 99,
    expressShipping: 199,
    overnightShipping: 299,
  },

  wishlist: {
    maxItems: 100,
  },

  auth: {
    passwordMinLength: 8,
    tokenExpiry: '7d',
    refreshTokenExpiry: '30d',
  },

  seo: {
    defaultTitle: 'ROXVORA | Premium Fashion & Lifestyle',
    defaultDescription: `Discover premium fashion and lifestyle products at ROXVORA. Free shipping on orders over ${CURRENCY_SYMBOL}${FREE_SHIPPING_THRESHOLD}.`,
    defaultImage: '/images/og-default.jpg',
    twitterHandle: '@roxvora',
  },

  social: {
    facebook: 'https://facebook.com/roxvora',
    instagram: 'https://instagram.com/roxvora',
    twitter: 'https://twitter.com/roxvora',
    youtube: 'https://youtube.com/roxvora',
    tiktok: 'https://tiktok.com/@roxvora',
    pinterest: 'https://pinterest.com/roxvora',
  },

  support: {
    email: 'support@roxvora.com',
    phone: '+1 (555) 123-4567',
    hours: 'Mon-Fri: 9AM-6PM EST',
  },

  features: {
    guestCheckout: true,
    socialLogin: true,
    wishlist: true,
    compareProducts: false,
    loyaltyProgram: false,
    subscriptions: false,
  },
};