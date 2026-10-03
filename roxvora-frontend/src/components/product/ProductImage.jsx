import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';

const ProductImage = forwardRef(function ProductImage(
  {
    src,
    alt = '',
    width,
    height,
    className = '',
    priority = false,
    placeholder = '/images/placeholders/product.jpg',
    style,
    onLoad,
    onError,
    ...rest
  },
  ref
) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const imageSrc = hasError ? placeholder : src;

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height, ...style }}
      role="img"
      aria-label={alt}
      {...rest}
    >
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 skeleton" aria-hidden="true" />
      )}

      <motion.img
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
});

export default ProductImage;