export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  appName: import.meta.env.VITE_APP_NAME || 'ROXVORA',
  appUrl: import.meta.env.VITE_APP_URL || 'http://localhost:3000',
  stripePublishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '',
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  facebookAppId: import.meta.env.VITE_FACEBOOK_APP_ID || '',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};