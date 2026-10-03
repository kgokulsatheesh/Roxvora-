export const imageHelper = {
  getOptimizedUrl: (url, width, height, quality = 80) => {
    if (!url) return '/images/placeholders/product.jpg';
    return `${url}?w=${width}&h=${height}&q=${quality}&fit=crop`;
  },

  getResponsiveSizes: (baseWidth) => ({
    mobile: baseWidth * 0.5,
    tablet: baseWidth * 0.75,
    desktop: baseWidth,
  }),

  getPlaceholder: (type = 'product') => {
    const placeholders = {
      product: '/images/placeholders/product.jpg',
      category: '/images/placeholders/category.jpg',
      banner: '/images/placeholders/banner.jpg',
      avatar: '/images/placeholders/avatar.jpg',
    };
    return placeholders[type] || placeholders.product;
  },

  isValidImageUrl: (url) => {
    if (!url) return false;
    return /\.(jpeg|jpg|png|webp|avif)(\?.*)?$/i.test(url);
  },

  getImageDimensions: (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = () => resolve({ width: 0, height: 0 });
      img.src = URL.createObjectURL(file);
    });
  },
};