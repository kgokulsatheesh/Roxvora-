import { useState, useRef, useEffect, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight, FiMaximize } from 'react-icons/fi';

import ProductImage from './ProductImage';
import { motion, AnimatePresence } from 'framer-motion';

const ProductGallery = ({
  images = [],
  mainImageIndex = 0,
  onImageChange,
  showThumbnails = true,
  thumbnailPosition = 'bottom',
  enableZoom = true,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(mainImageIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const mainImageRef = useRef(null);
  const thumbnailsRef = useRef(null);

  useEffect(() => {
    setCurrentIndex(mainImageIndex);
  }, [mainImageIndex]);

  const goToImage = (index) => {
    if (index >= 0 && index < images.length) {
      setCurrentIndex(index);
      onImageChange?.(index);
    }
  };

  const stepImage = useCallback(
    (delta) => {
      setCurrentIndex((prev) => {
        const next = (prev + delta + images.length) % images.length;
        onImageChange?.(next);
        return next;
      });
    },
    [images.length, onImageChange]
  );

  const nextImage = () => stepImage(1);
  const prevImage = () => stepImage(-1);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft') stepImage(-1);
      if (e.key === 'ArrowRight') stepImage(1);
      if (e.key === 'Escape') setIsZoomed(false);
    },
    [stepImage]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleMouseMove = (e) => {
    if (!isZoomed || !mainImageRef.current) return;

    const rect = mainImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  const handleWheel = (e) => {
    if (!enableZoom) return;
    e.preventDefault();
    if (e.deltaY < 0) {
      setIsZoomed(true);
    } else if (isZoomed) {
      setIsZoomed(false);
      setZoomPosition({ x: 50, y: 50 });
    }
  };

  const currentImage = images[currentIndex];

  return (
    <div className={`relative ${className}`} role="region" aria-label="Product image gallery">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-50">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <ProductImage
              ref={mainImageRef}
              src={currentImage?.url || currentImage}
              alt={currentImage?.alt || `Product image ${currentIndex + 1}`}
              priority
              className={`w-full h-full ${isZoomed ? 'cursor-zoom-out' : enableZoom ? 'cursor-zoom-in' : ''}`}
              onMouseMove={handleMouseMove}
              onWheel={handleWheel}
              onClick={() => enableZoom && setIsZoomed(!isZoomed)}
              style={{
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                transform: isZoomed ? 'scale(2)' : 'scale(1)',
              }}
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              type="button"
              className="absolute left-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-icon bg-white/90 backdrop-blur-sm hover:bg-white"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <FiChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-icon bg-white/90 backdrop-blur-sm hover:bg-white"
              onClick={nextImage}
              aria-label="Next image"
            >
              <FiChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </>
        )}

        {enableZoom && images.length > 1 && (
          <button
            type="button"
            className="absolute top-3 right-3 btn btn-ghost btn-icon bg-white/90 backdrop-blur-sm hover:bg-white"
            onClick={() => setIsZoomed(!isZoomed)}
            aria-label={isZoomed ? 'Exit zoom' : 'Zoom in'}
            aria-pressed={isZoomed}
          >
            <FiMaximize className="w-5 h-5" aria-hidden="true" />
          </button>
        )}
      </div>

      {showThumbnails && images.length > 1 && (
        <div
          ref={thumbnailsRef}
          className={`mt-4 flex gap-2 overflow-x-auto pb-2 ${thumbnailPosition === 'left' ? 'flex-col' : ''}`}
          role="tablist"
          aria-label="Product image thumbnails"
        >
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`View image ${index + 1}`}
              onClick={() => goToImage(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-secondary'
                  : 'border-transparent hover:border-neutral-300'
              }`}
            >
              <ProductImage
                src={image.url || image}
                alt={image.alt || `Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {index === currentIndex && (
                <div className="absolute inset-0 bg-primary/20" aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;